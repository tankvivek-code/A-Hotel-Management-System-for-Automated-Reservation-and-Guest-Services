import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/manager/booking";

const ManagerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("accessToken");

  const fetchBookings = async () => {
    const res = await axios.get(API, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ================= HELPERS ================= */
  const isCheckoutExpired = (checkOut) => {
    return new Date(checkOut) < new Date();
  };

  const checkoutBooking = async (id) => {
    if (!window.confirm("Checkout this booking?")) return;

    await axios.put(
      `http://localhost:5000/api/manager/booking/${id}/checkout`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );

    fetchBookings();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Room Bookings</h1>

      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2">User</th>
              <th className="p-2">Email</th>
              <th className="p-2">Room</th>
              <th className="p-2">Check In</th>
              <th className="p-2">Check Out</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Payment Details</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => {
              const expired = isCheckoutExpired(b.checkOut);

              return (
                <tr key={b._id} className="border-t text-center">
                  <td className="p-2">{b.userId?.name}</td>
                  <td className="p-2">{b.userId?.email}</td>
                  <td className="p-2">{b.roomId?.roomNumber}</td>

                  {/* DATE + TIME */}
                  <td className="p-2">
                    {new Date(b.checkIn).toLocaleString()}
                  </td>
                  <td className="p-2">
                    {new Date(b.checkOut).toLocaleString()}
                  </td>

                  <td className="p-2">
                    {b.paymentMethod} ({b.paymentStatus})
                  </td>

                  <td className="p-2">₹{b.amount}</td>

                  <td className="p-2 text-left">
                    {b.paymentMethod === "UPI" && (
                      <>UPI: {b.paymentDetails?.upiId}</>
                    )}
                    {b.paymentMethod === "Card" && (
                      <>
                        {b.paymentDetails?.cardHolder} (****
                        {b.paymentDetails?.cardLast4})
                      </>
                    )}
                    {b.paymentMethod === "NetBanking" && (
                      <>Bank: {b.paymentDetails?.bankName}</>
                    )}
                    {b.paymentMethod === "Cash" && <>Cash Payment</>}
                  </td>

                  {/* CHECKOUT BUTTON */}
                  <td className="p-2">
                    {b.status !== "Checked-Out" ? (
                      <button
                        disabled={expired}
                        onClick={() => checkoutBooking(b._id)}
                        className={`px-3 py-1 rounded text-white ${
                          expired
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        Checkout
                      </button>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        Checked Out
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No bookings found</p>
        )}
      </div>
    </div>
  );
};

export default ManagerBookings;
