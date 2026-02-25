import { useEffect, useState } from "react";
import axios from "axios";
import PrimaryButton from "../../Component/PrimaryButton";
import Primaryinput from "../../Component/Primaryinput";

const API = "http://localhost:5000/api/manager/rooms";
const BASE_URL = "http://localhost:5000";

const ManagerRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    roomNumber: "",
    type: "",
    price: "",
    status: "Available",
  });

  const token = localStorage.getItem("accessToken");

  /* ================= FETCH ROOMS ================= */
  const fetchRooms = async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRooms(res.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    if (token) fetchRooms();
  }, [token]);

  /* ================= CREATE ================= */
  const createRoom = async () => {
    if (!form.roomNumber || !form.type || !form.price) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("roomNumber", form.roomNumber);
      formData.append("type", form.type);
      formData.append("price", Number(form.price));
      formData.append("status", form.status);
      if (imageFile) formData.append("image", imageFile);

      await axios.post(API, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      resetForm();
      fetchRooms();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add room");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE ================= */
  const updateRoom = async () => {
    if (!editingRoom) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("roomNumber", form.roomNumber);
      formData.append("type", form.type);
      formData.append("price", Number(form.price));
      formData.append("status", form.status);
      if (imageFile) formData.append("image", imageFile);

      await axios.put(`${API}/${editingRoom._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      resetForm();
      fetchRooms();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update room");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const deleteRoom = async (room) => {
    if (room.status === "Booked") {
      alert("Booked room cannot be deleted");
      return;
    }

    if (!window.confirm("Delete this room?")) return;

    try {
      await axios.delete(`${API}/${room._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRooms();
    } catch {
      alert("Failed to delete room");
    }
  };

  const resetForm = () => {
    setEditingRoom(null);
    setImageFile(null);
    setForm({
      roomNumber: "",
      type: "",
      price: "",
      status: "Available",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8 space-y-8">
      <h1 className="text-2xl font-bold">Manage Rooms</h1>

      {/* ================= FORM CARD ================= */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-6">
          {editingRoom ? "Edit Room" : "Add New Room"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Primaryinput
            placeholder="Room Number"
            value={form.roomNumber}
            onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
          />

          <Primaryinput
            placeholder="Room Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />

          <Primaryinput
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <select
            className="border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="Available">Available</option>
            {editingRoom?.status === "Booked" && (
              <option value="Booked">Booked</option>
            )}
          </select>

          <input
            key={editingRoom?._id || "new"}
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border border-gray-300 rounded-lg px-3 py-2.5"
          />
        </div>

        <div className="mt-6 flex gap-4">
          {editingRoom ? (
            <>
              <PrimaryButton
                text="Update Room"
                disabled={loading || editingRoom.status === "Booked"}
                onClick={updateRoom}
              />
              <PrimaryButton
                text="Cancel"
                className="bg-gray-400"
                onClick={resetForm}
              />
            </>
          ) : (
            <PrimaryButton
              text="Add Room"
              className="bg-green-600"
              disabled={loading}
              onClick={createRoom}
            />
          )}
        </div>
      </div>

      {/* ================= ROOMS TABLE ================= */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-3 text-left">Room</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((r) => (
              <tr key={r._id} className="border-t hover:bg-slate-50 transition">
                <td className="p-3 font-medium">{r.roomNumber}</td>
                <td className="p-3">{r.type}</td>
                <td className="p-3">₹{r.price}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      r.status === "Booked"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>

                <td className="p-3">
                  {r.image && (
                    <img
                      src={`${BASE_URL}${r.image}`}
                      className="h-12 w-20 object-cover rounded-md"
                      alt="room"
                    />
                  )}
                </td>

                <td className="p-3 flex gap-2">
                  <PrimaryButton
                    text="Edit"
                    disabled={r.status === "Booked"}
                    onClick={() => {
                      setEditingRoom(r);
                      setImageFile(null);
                      setForm({
                        roomNumber: r.roomNumber,
                        type: r.type,
                        price: r.price,
                        status: r.status,
                      });
                    }}
                  />
                  <PrimaryButton
                    text="Delete"
                    className="bg-red-600"
                    disabled={r.status === "Booked"}
                    onClick={() => deleteRoom(r)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rooms.length === 0 && (
          <p className="text-center text-slate-500 py-6">No rooms found</p>
        )}
      </div>
    </div>
  );
};

export default ManagerRooms;
