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
    <div className="bg-slate-50 min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h1 className="text-3xl font-bold text-slate-900">My Payments</h1>
          <p className="text-slate-500 text-sm mt-1">
            View all your payment and booking details
          </p>
        </div>

        <QuickActionCards />

        {/* PAYMENTS LIST */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border">
          {payments.length === 0 ? (
            <p className="text-center text-slate-500 py-6">No payments found</p>
          ) : (
            <div className="space-y-6">
              {payments.map((p) => (
                <div
                  key={p._id}
                  className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition"
                >
                  <div className="flex flex-col md:flex-row md:justify-between gap-6">
                    {/* LEFT */}
                    <div className="space-y-2">
                      <p className="font-semibold text-xl">
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

                      <p className="text-sm">
                        Payment Method: <b>{p.paymentMethod}</b>
                      </p>

                      <p className="text-base font-semibold mt-2">
                        Amount: ₹{p.amount}
                      </p>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col gap-3 md:items-end">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${badgeStyle(
                          p.paymentStatus,
                        )}`}
                      >
                        {p.paymentStatus}
                      </span>

                      <span className="px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                        {p.status}
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
