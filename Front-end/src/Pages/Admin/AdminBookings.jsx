import { useEffect, useState } from "react";
import axios from "axios";
import AdminQuickActionCards from "../../Component/common/adminQuickActionCards";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const token = localStorage.getItem("accessToken");

  /* ================= FETCH BOOKINGS ================= */
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(res.data);
    } catch {
      setBookings([]);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ================= CHECKOUT ================= */
  const handleCheckout = async (bookingId) => {
    const confirm = window.confirm(
      "Are you sure you want to checkout this room?"
    );
    if (!confirm) return;

    try {
      setLoadingId(bookingId);

      await axios.put(
        `http://localhost:5000/api/checkout/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBookings(); // refresh after checkout
    } catch (err) {
      alert("Checkout failed");
    } finally {
      setLoadingId(null);
    }
  };

  /* ================= INVOICE ================= */
  const viewInvoice = async (bookingId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/invoice/${bookingId}`,
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
    }
  };

  const badge = (type) => {
    if (type === "Paid") return "bg-green-100 text-green-700";
    if (type === "Pending") return "bg-yellow-100 text-yellow-700";
    return "bg-slate-200 text-slate-700";
  };

  return (
    <div className="bg-slate-50 min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <AdminQuickActionCards />

        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold">All Bookings (Admin)</h1>
          <p className="text-slate-600 text-sm">
            View who booked which room, payment & booking status
          </p>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Room</th>
                <th className="px-4 py-3">Check-In</th>
                <th className="px-4 py-3">Check-Out</th>
                <th className="px-4 py-3">Booked On</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3">Payment Details</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-slate-500">
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b._id} className="border-t">
                    {/* CUSTOMER */}
                    <td className="px-4 py-3">
                      <div className="font-medium">
                        {b.userId?.name || b.name || "N/A"}
                      </div>
                      <div className="text-xs text-slate-500">
                        {b.userId?.email || b.email || "N/A"}
                      </div>
                      <div className="text-xs text-slate-500">
                        {b.phone || "-"}
                      </div>
                    </td>

                    {/* ROOM */}
                    <td className="px-4 py-3">
                      {b.roomId?.type}
                      <div className="text-xs text-slate-500">
                        ₹{b.roomId?.price}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      {new Date(b.checkIn).toLocaleString()}
                    </td>

                    <td className="px-4 py-3">
                      {new Date(b.checkOut).toLocaleString()}
                    </td>

                    <td className="px-4 py-3">
                      {new Date(b.createdAt).toLocaleString()}
                    </td>

                    <td className="px-4 py-3 font-semibold">₹{b.amount}</td>

                    {/* PAYMENT */}
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${badge(
                          b.paymentStatus
                        )}`}
                      >
                        {b.paymentStatus}
                      </span>
                    </td>

                    {/* PAYMENT METHOD */}
                    <td className="px-4 py-3 font-medium">{b.paymentMethod}</td>

                    {/* PAYMENT DETAILS */}
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {b.paymentMethod === "UPI" && (
                        <div>UPI: {b.paymentDetails?.upiId}</div>
                      )}

                      {b.paymentMethod === "Card" && (
                        <>
                          <div>{b.paymentDetails?.cardHolder}</div>
                          <div>**** {b.paymentDetails?.cardLast4}</div>
                        </>
                      )}

                      {b.paymentMethod === "NetBanking" && (
                        <div>Bank: {b.paymentDetails?.bankName}</div>
                      )}

                      {b.paymentMethod === "Cash" && <div>Paid in Cash</div>}
                    </td>

                    {/* STATUS */}
                    <td className="px-4 py-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {b.status}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => viewInvoice(b._id)}
                        className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
                      >
                        Invoice
                      </button>

                      {b.status !== "Checked-Out" && (
                        <button
                          disabled={loadingId === b._id}
                          onClick={() => handleCheckout(b._id)}
                          className={`px-3 py-1 rounded text-xs text-white ${
                            loadingId === b._id
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-red-600 cursor-pointer"
                          }`}
                        >
                          {loadingId === b._id ? "Processing..." : "Checkout"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
