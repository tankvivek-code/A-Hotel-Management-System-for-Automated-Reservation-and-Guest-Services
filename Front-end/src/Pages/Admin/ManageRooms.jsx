import { useEffect, useState } from "react";
import axios from "axios";
import PrimaryButton from "../../Component/PrimaryButton";
import Primaryinput from "../../Component/Primaryinput";
import AdminQuickActionCards from "../../Component/common/adminQuickActionCards";

const API = "http://localhost:5000/api/admin/rooms";
const BASE_URL = "http://localhost:5000";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    roomNumber: "",
    type: "",
    price: "",
    status: "Available",
  });

  const token = localStorage.getItem("accessToken");

  /* ================= FETCH ROOMS ================= */
  const fetchRooms = async () => {
    const res = await axios.get(API, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRooms(res.data);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  /* ================= CREATE ROOM ================= */
  const createRoom = async () => {
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (imageFile) formData.append("image", imageFile);

    await axios.post(API, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    resetForm();
    fetchRooms();
  };

  /* ================= UPDATE ROOM ================= */
  const updateRoom = async () => {
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (imageFile) formData.append("image", imageFile);

    await axios.put(`${API}/${editingRoom._id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    resetForm();
    fetchRooms();
  };

  /* ================= DELETE ROOM ================= */
  const deleteRoom = async (id) => {
    await axios.delete(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchRooms();
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
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Room Management</h1>

      <div className="mb-8">
        <AdminQuickActionCards />
      </div>

      {/* ================= ROOM FORM ================= */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {editingRoom ? "Edit Room" : "Add New Room"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            placeholder="Price per Night"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          {/* 🔥 IMAGE FILE INPUT */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border rounded px-3 py-2"
          />

          <select
            className="border rounded px-3 py-2"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
          </select>
        </div>

        <div className="mt-4 flex gap-3">
          {editingRoom ? (
            <>
              <PrimaryButton
                className="bg-yellow-500"
                text="Update Room"
                onClick={updateRoom}
              />
              <PrimaryButton
                className="bg-gray-400"
                text="Cancel"
                onClick={resetForm}
              />
            </>
          ) : (
            <PrimaryButton
              className="bg-green-600"
              text="Add Room"
              onClick={createRoom}
            />
          )}
        </div>
      </div>

      {/* ================= ROOMS TABLE ================= */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">All Rooms</h2>

        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Room</th>
              <th className="p-3">Type</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Image</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="p-3">{r.roomNumber}</td>
                <td className="p-3">{r.type}</td>
                <td className="p-3">₹{r.price}</td>
                <td className="p-3 font-medium">{r.status}</td>{" "}
                {/* READ ONLY */}
                <td className="p-3">
                  {r.image && (
                    <img
                      src={`${BASE_URL}${r.image}`}
                      className="h-12 w-20 object-cover rounded"
                    />
                  )}
                </td>
                <td className="p-3 flex gap-2">
                  <PrimaryButton
                    text="Edit"
                    disabled={r.status === "Booked"}
                    onClick={() => {
                      setEditingRoom(r);
                      setForm(r);
                    }}
                  />
                  <PrimaryButton
                    className="bg-red-600"
                    text="Delete"
                    disabled={r.status === "Booked"}
                    onClick={() => deleteRoom(r._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rooms.length === 0 && (
          <p className="text-center text-slate-500 py-4">No rooms available</p>
        )}
      </div>
    </div>
  );
};

export default ManageRooms;
