import { useEffect, useState } from "react";
import axios from "axios";
import PrimaryButton from "../../Component/PrimaryButton";
import Primaryinput from "../../Component/Primaryinput";

const USERS_API = "http://localhost:5000/api/manager/users";
const ROOMS_API = "http://localhost:5000/api/manager/rooms";
const BOOK_API = "http://localhost:5000/api/book-room";

const ManagerUsers = () => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedRoomPrice, setSelectedRoomPrice] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [bookingForm, setBookingForm] = useState({
    phone: "",
    checkIn: "",
    checkOut: "",
    paymentMethod: "Cash",
    upiId: "",
    cardHolder: "",
    cardLast4: "",
    bankName: "",
    referenceNo: "",
  });

  const token = localStorage.getItem("accessToken");

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    const res = await axios.get(USERS_API, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  /* ================= FETCH ROOMS ================= */
  const fetchRooms = async () => {
    const res = await axios.get(ROOMS_API, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRooms(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchRooms();
  }, [token]);

  /* ================= CREATE USER ================= */
  const createUser = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("All fields required");
      return;
    }

    await axios.post(USERS_API, form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setForm({ name: "", email: "", password: "" });
    fetchUsers();
  };

  /* ================= DELETE USER ================= */
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await axios.delete(`${USERS_API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchUsers();
  };

  /* ================= BOOK ROOM ================= */
  const bookRoomForUser = async () => {
    const {
      phone,
      checkIn,
      checkOut,
      paymentMethod,
      upiId,
      cardHolder,
      cardLast4,
      bankName,
    } = bookingForm;

    if (!selectedRoom || !phone || !checkIn || !checkOut) {
      alert("All booking details required");
      return;
    }

    if (paymentMethod === "UPI" && !upiId) {
      alert("UPI ID required");
      return;
    }

    if (paymentMethod === "Card" && (!cardHolder || !cardLast4)) {
      alert("Card details required");
      return;
    }

    if (paymentMethod === "NetBanking" && !bankName) {
      alert("Bank name required");
      return;
    }

    await axios.post(
      BOOK_API,
      {
        roomId: selectedRoom,
        userId: selectedUser._id,
        name: selectedUser.name,
        email: selectedUser.email,
        phone,
        checkIn,
        checkOut,
        paymentMethod,
        amount: selectedRoomPrice,
        bookedBy: "admin",
        paymentDetails: {
          upiId,
          cardHolder,
          cardLast4,
          bankName,
          referenceNo: bookingForm.referenceNo,
        },
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    alert("Room booked successfully");

    setSelectedUser(null);
    setSelectedRoom("");
    setSelectedRoomPrice(0);
    setBookingForm({
      phone: "",
      checkIn: "",
      checkOut: "",
      paymentMethod: "Cash",
      upiId: "",
      cardHolder: "",
      cardLast4: "",
      bankName: "",
      referenceNo: "",
    });

    fetchRooms();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {/* ADD USER */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-3">Add User</h2>

        <div className="grid md:grid-cols-3 gap-3">
          <Primaryinput
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Primaryinput
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Primaryinput
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <PrimaryButton
          className="mt-4 bg-green-600"
          text="Create User"
          onClick={createUser}
        />
      </div>

      {/* USERS TABLE */}
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2 flex gap-2">
                  <PrimaryButton
                    text="Book Room"
                    className="bg-blue-600"
                    onClick={() => setSelectedUser(u)}
                  />
                  <PrimaryButton
                    text="Delete"
                    className="bg-red-600"
                    onClick={() => deleteUser(u._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BOOKING FORM */}
      {selectedUser && (
        <div className="mt-6 bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">
            Book Room for {selectedUser.name}
          </h2>

          <select
            className="border p-2 w-full mb-4"
            value={selectedRoom}
            onChange={(e) => {
              const room = rooms.find((r) => r._id === e.target.value);
              setSelectedRoom(room._id);
              setSelectedRoomPrice(room.price);
            }}
          >
            <option value="">Select Available Room</option>
            {rooms
              .filter((r) => r.status === "Available")
              .map((r) => (
                <option key={r._id} value={r._id}>
                  Room {r.roomNumber} – ₹{r.price}
                </option>
              ))}
          </select>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Primaryinput
              placeholder="Phone Number"
              value={bookingForm.phone}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, phone: e.target.value })
              }
            />

            <select
              className="border p-2"
              value={bookingForm.paymentMethod}
              onChange={(e) =>
                setBookingForm({
                  ...bookingForm,
                  paymentMethod: e.target.value,
                })
              }
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="NetBanking">Net Banking</option>
            </select>

            <Primaryinput
              type="datetime-local"
              value={bookingForm.checkIn}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, checkIn: e.target.value })
              }
            />

            <Primaryinput
              type="datetime-local"
              value={bookingForm.checkOut}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, checkOut: e.target.value })
              }
            />
          </div>

          {/* PAYMENT DETAILS */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {bookingForm.paymentMethod === "UPI" && (
              <Primaryinput
                placeholder="UPI ID"
                value={bookingForm.upiId}
                onChange={(e) =>
                  setBookingForm({ ...bookingForm, upiId: e.target.value })
                }
              />
            )}

            {bookingForm.paymentMethod === "Card" && (
              <>
                <Primaryinput
                  placeholder="Card Holder Name"
                  value={bookingForm.cardHolder}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      cardHolder: e.target.value,
                    })
                  }
                />
                <Primaryinput
                  placeholder="Last 4 digits"
                  maxLength={4}
                  value={bookingForm.cardLast4}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      cardLast4: e.target.value,
                    })
                  }
                />
              </>
            )}

            {bookingForm.paymentMethod === "NetBanking" && (
              <Primaryinput
                placeholder="Bank Name"
                value={bookingForm.bankName}
                onChange={(e) =>
                  setBookingForm({
                    ...bookingForm,
                    bankName: e.target.value,
                  })
                }
              />
            )}
          </div>

          <PrimaryButton
            text="Confirm Booking"
            className="bg-green-600"
            onClick={bookRoomForUser}
          />
        </div>
      )}
    </div>
  );
};

export default ManagerUsers;
