import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import QuickActionCards from "../../Component/common/QuickActionCards";

const BASE_URL = "http://localhost:5000";

const CustomerPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [step, setStep] = useState("form");

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    checkIn: "",
    checkOut: "",
    paymentMethod: "",
    paymentDetails: {},
  });

  const fetchRooms = () => {
    axios
      .get("http://localhost:5000/public/rooms")
      .then((res) => setRooms(res.data));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* WELCOME */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold">Welcome, {user?.name} 👋</h1>
          <p className="text-slate-600 mt-2">
            View available rooms and manage bookings easily.
          </p>
        </section>

        <QuickActionCards />

        {/* ROOMS */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Available Rooms</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.map((room) => {
              const isBooked = room.status === "Booked";

              return (
                <div
                  key={room._id}
                  className="border rounded-lg overflow-hidden"
                >
                  <img
                    src={`${BASE_URL}${room.image}`}
                    alt={room.type}
                    className="h-36 w-full object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-semibold">{room.type}</h3>
                    <p className="font-bold mt-2">₹{room.price}</p>

                    <button
                      disabled={isBooked}
                      onClick={() => {
                        setSelectedRoom(room);
                        setStep("form");
                      }}
                      className={`mt-3 w-full py-2 rounded text-white ${
                        isBooked
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-slate-800 hover:bg-slate-900"
                      }`}
                    >
                      {isBooked ? "Booked" : "Book Now"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* BOOKING MODAL */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {step === "form" ? "Book Room" : "Payment"}
            </h2>

            {step === "form" && (
              <>
                <input
                  value={form.name}
                  disabled
                  className="w-full border p-2 mb-3 rounded bg-gray-100"
                />
                <input
                  value={form.email}
                  disabled
                  className="w-full border p-2 mb-3 rounded bg-gray-100"
                />

                <input
                  placeholder="Phone Number"
                  className="w-full border p-2 mb-3 rounded"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />

                <input
                  type="datetime-local"
                  className="w-full border p-2 mb-3 rounded"
                  onChange={(e) =>
                    setForm({ ...form, checkIn: e.target.value })
                  }
                />

                <input
                  type="datetime-local"
                  className="w-full border p-2 mb-4 rounded"
                  onChange={(e) =>
                    setForm({ ...form, checkOut: e.target.value })
                  }
                />

                <button
                  className="w-full bg-green-600 text-white py-2 rounded"
                  onClick={() => setStep("payment")}
                >
                  Proceed to Payment
                </button>
              </>
            )}

            {/* PAYMENT STEP (ONLINE ONLY) */}
            {step === "payment" && (
              <>
                <p className="mb-4">
                  Room: <b>{selectedRoom.type}</b>
                  <br />
                  Amount: <b>₹{selectedRoom.price}</b>
                </p>

                {/* PAYMENT METHOD */}
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
                  <option value="">-- Select Payment Method --</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Debit / Credit Card</option>
                  <option value="NetBanking">Net Banking</option>
                </select>

                {/* 🔥 CONDITIONAL INPUTS */}
                {form.paymentMethod === "UPI" && (
                  <input
                    placeholder="Enter UPI ID"
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
                  className="w-full bg-blue-600 text-white py-2 rounded"
                  onClick={async () => {
                    if (!form.paymentMethod) {
                      alert("Select payment method");
                      return;
                    }

                    await axios.post(
                      "http://localhost:5000/api/book-room",
                      {
                        roomId: selectedRoom._id,
                        ...form,
                        amount: selectedRoom.price,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                          )}`,
                        },
                      }
                    );

                    setSelectedRoom(null);
                    fetchRooms();
                    navigate("/my-bookings");
                  }}
                >
                  Pay & Confirm
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;
