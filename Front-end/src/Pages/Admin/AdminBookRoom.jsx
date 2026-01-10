import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const AdminBookRoom = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    paymentMethod: "Cash",
    paymentDetails: {},
  });

  /* ================= FETCH USER ================= */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/admin/users/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setForm((prev) => ({
          ...prev,
          name: res.data.name,
          email: res.data.email,
        }));
      } catch {
        alert("Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, token]);

  /* ================= FETCH ROOMS ================= */
  useEffect(() => {
    axios.get("http://localhost:5000/public/rooms").then((res) => {
      setRooms(res.data);
    });
  }, []);

  /* ================= CONFIRM BOOKING ================= */
  const confirmBooking = async () => {
    if (!selectedRoom) return alert("Please select a room");
    if (!form.checkIn || !form.checkOut)
      return alert("Select check-in & check-out");

    // validation for non-cash
    if (
      form.paymentMethod !== "Cash" &&
      !Object.keys(form.paymentDetails).length
    ) {
      alert("Please fill payment details");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/book-room",
      {
        roomId: selectedRoom._id,
        userId,
        ...form,
        amount: selectedRoom.price,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    navigate("/admin/bookings");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Book Room (Admin)</h1>

      {/* ================= ROOMS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {rooms.map((room) => {
          const isBooked = room.status === "Booked";

          return (
            <div key={room._id} className="bg-white border rounded shadow">
              <img
                src={`${BASE_URL}${room.image}`}
                className="h-36 w-full object-cover"
                alt={room.type}
              />

              <div className="p-4">
                <h3 className="font-semibold">{room.type}</h3>
                <p className="font-bold">₹{room.price}</p>

                <button
                  disabled={isBooked}
                  onClick={() => setSelectedRoom(room)}
                  className={`mt-3 w-full py-2 rounded text-white ${
                    isBooked
                      ? "bg-gray-400"
                      : selectedRoom?._id === room._id
                      ? "bg-green-600"
                      : "bg-slate-800"
                  }`}
                >
                  {isBooked
                    ? "Booked"
                    : selectedRoom?._id === room._id
                    ? "Selected"
                    : "Select Room"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= FORM ================= */}
      {selectedRoom && (
        <div className="bg-white p-6 rounded shadow mt-8 max-w-xl">
          <input
            value={form.name}
            readOnly
            className="w-full border p-2 mb-3 bg-gray-100"
          />

          <input
            value={form.email}
            readOnly
            className="w-full border p-2 mb-3 bg-gray-100"
          />

          <input
            placeholder="Phone"
            className="w-full border p-2 mb-3"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            type="datetime-local"
            className="w-full border p-2 mb-3"
            onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
          />

          <input
            type="datetime-local"
            className="w-full border p-2 mb-4"
            onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
          />

          {/* 💳 PAYMENT METHOD */}
          <select
            className="w-full border p-2 mb-3"
            value={form.paymentMethod}
            onChange={(e) =>
              setForm({
                ...form,
                paymentMethod: e.target.value,
                paymentDetails: {},
              })
            }
          >
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Card">Debit / Credit Card</option>
            <option value="NetBanking">Net Banking</option>
          </select>

          {/* 🔥 CONDITIONAL PAYMENT DETAILS */}
          {form.paymentMethod === "UPI" && (
            <input
              placeholder="UPI ID"
              className="w-full border p-2 mb-3"
              onChange={(e) =>
                setForm({
                  ...form,
                  paymentDetails: { upiId: e.target.value },
                })
              }
            />
          )}

          {form.paymentMethod === "Card" && (
            <>
              <input
                placeholder="Card Holder Name"
                className="w-full border p-2 mb-3"
                onChange={(e) =>
                  setForm({
                    ...form,
                    paymentDetails: {
                      ...form.paymentDetails,
                      cardHolder: e.target.value,
                    },
                  })
                }
              />
              <input
                placeholder="Last 4 digits of card"
                maxLength="4"
                className="w-full border p-2 mb-3"
                onChange={(e) =>
                  setForm({
                    ...form,
                    paymentDetails: {
                      ...form.paymentDetails,
                      cardLast4: e.target.value,
                    },
                  })
                }
              />
            </>
          )}

          {form.paymentMethod === "NetBanking" && (
            <input
              placeholder="Bank Name"
              className="w-full border p-2 mb-3"
              onChange={(e) =>
                setForm({
                  ...form,
                  paymentDetails: { bankName: e.target.value },
                })
              }
            />
          )}

          <button
            onClick={confirmBooking}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminBookRoom;
