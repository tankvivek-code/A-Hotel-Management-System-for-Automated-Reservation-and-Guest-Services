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
          responseType: "blob",
        },
      );

      const file = new Blob([res.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } catch (err) {
      alert("Failed to load invoice");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="text-slate-600 text-sm mt-1">
            View your current and past bookings
          </p>
        </div>

        <QuickActionCards />

        <section className="bg-white p-6 rounded-2xl shadow-sm border">
          {bookings.length === 0 ? (
            <p className="text-center text-slate-500 py-6">No bookings found</p>
          ) : (
            <div className="space-y-6">
              {bookings.map((b) => (
                <div
                  key={b._id}
                  className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition space-y-3"
                >
                  <p className="font-semibold text-lg">{b.roomId?.type}</p>
                
                  <p className="text-sm text-slate-600">
                    {new Date(b.checkIn).toLocaleString()} →{" "}
                    {new Date(b.checkOut).toLocaleString()}
                  </p>

                  <p className="text-sm font-medium">Amount: ₹{b.amount}</p>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => viewInvoice(b._id)}
                      className="px-4 py-1.5 rounded-md text-xs bg-blue-600 hover:bg-blue-700 text-white transition"
                    >
                      Invoice
                    </button>

                    <span
                      className={`px-4 py-1 rounded-full text-xs font-medium ${
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
