import { useEffect, useState } from "react";
import axios from "axios";
import QuickActionCards from "../../Component/common/QuickActionCards";

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/my-bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => setPayments(res.data))
      .catch(() => setPayments([]));
  }, []);

  const badgeStyle = (status) => {
    if (status === "Paid") return "bg-green-100 text-green-700";
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
    return "bg-slate-200 text-slate-700";
  };

  return (
    <div className="bg-slate-50 min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold">My Payments</h1>
          <p className="text-slate-600 text-sm mt-1">
            View all payment and booking details
          </p>
        </div>

        <QuickActionCards />

        {/* PAYMENTS */}
        <section className="bg-white p-6 rounded-lg shadow">
          {payments.length === 0 ? (
            <p className="text-center text-slate-500">No payments found</p>
          ) : (
            <div className="space-y-4">
              {payments.map((p) => (
                <div
                  key={p._id}
                  className="border rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    {/* LEFT INFO */}
                    <div>
                      <p className="font-semibold text-lg">
                        {p.roomId?.type} Room
                      </p>

                      <p className="text-sm text-slate-600">
                        Check-in: <b>{new Date(p.checkIn).toLocaleString()}</b>
                      </p>

                      <p className="text-sm text-slate-600">
                        Check-out:{" "}
                        <b>{new Date(p.checkOut).toLocaleString()}</b>
                      </p>

                      <p className="text-sm text-slate-600">
                        Booked on:{" "}
                        <b>{new Date(p.createdAt).toLocaleString()}</b>
                      </p>

                      <p className="text-sm text-slate-600 mt-1">
                        Payment Method: <b>{p.paymentMethod}</b>
                      </p>
                      <p className="text-sm font-medium mt-2">
                        Amount Paid: <b>₹{p.amount}</b>
                      </p>
                    </div>

                    {/* RIGHT STATUS */}
                    <div className="flex flex-col gap-2 items-start md:items-end">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${badgeStyle(
                          p.paymentStatus,
                        )}`}
                      >
                        Payment: {p.paymentStatus}
                      </span>

                      <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 font-medium">
                        Booking: {p.status}
                      </span>
                    </div>
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

export default Payments;
