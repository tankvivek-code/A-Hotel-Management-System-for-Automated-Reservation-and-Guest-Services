import { useEffect, useState } from "react";
import axios from "axios";
import QuickActionCards from "../../Component/common/QuickActionCards";

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/my-bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => setBookings(res.data));
  }, []);

  const viewInvoice = async (bookingId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/invoice/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          responseType: "blob", // 🔥 IMPORTANT
        }
      );

      const file = new Blob([res.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } catch (err) {
      alert("Failed to load invoice");
      console.error(err);
    }
  };

  const getStatusStyle = (status) =>
    status === "Confirmed"
      ? "bg-green-100 text-green-700"
      : "bg-slate-200 text-slate-700";

  return (
    <div className="bg-slate-50 min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="text-slate-600 text-sm mt-1">
            View your current and past bookings
          </p>
        </div>

        <QuickActionCards />

        <section className="bg-white p-6 rounded-lg shadow">
          {bookings.length === 0 ? (
            <p className="text-center text-slate-500">No bookings found</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b._id} className="border p-4 rounded space-y-2">
                  <p className="font-semibold">{b.roomId?.type}</p>

                  <p className="text-sm text-slate-600">
                    {new Date(b.checkIn).toLocaleString()} →{" "}
                    {new Date(b.checkOut).toLocaleString()}
                  </p>

                  <p className="text-sm">Amount: ₹{b.amount}</p>

                  <p className="text-sm">
                    <b>Payment Method:</b> {b.paymentMethod}
                  </p>

                  {/* PAYMENT DETAILS */}
                  {b.paymentDetails && (
                    <div className="text-xs text-slate-600">
                      {b.paymentMethod === "UPI" && (
                        <p>UPI ID: {b.paymentDetails.upiId}</p>
                      )}

                      {b.paymentMethod === "Card" && (
                        <>
                          <p>Card Holder: {b.paymentDetails.cardHolder}</p>
                          <p>Card Last 4: **** {b.paymentDetails.cardLast4}</p>
                        </>
                      )}

                      {b.paymentMethod === "NetBanking" && (
                        <p>Bank: {b.paymentDetails.bankName}</p>
                      )}
                    </div>
                  )}

                  <p className="text-sm text-green-600 font-medium">
                    Payment Status: {b.paymentStatus}
                  </p>

                  <p className="text-xs text-slate-500">
                    Booked By: {b.bookedBy?.toUpperCase()}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => viewInvoice(b._id)}
                      className="px-3 py-1 rounded text-xs bg-blue-600 text-white"
                    >
                      Invoice
                    </button>

                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        b.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Booking;
