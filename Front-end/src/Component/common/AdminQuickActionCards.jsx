import { useNavigate } from "react-router-dom";
import { FaUsers, FaBed, FaChartLine } from "react-icons/fa";

const AdminQuickActionCards = () => {
  const navigate = useNavigate();

  const Card = ({ title, desc, icon, onClick }) => (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className="
        bg-white shadow rounded-xl p-6 cursor-pointer
        hover:shadow-lg hover:-translate-y-1
        active:scale-95
        transition-all duration-200
        flex flex-col items-center text-center
        min-h-[160px]
      "
    >
      <div className="text-3xl text-slate-700 mb-3">{icon}</div>
      <h3 className="font-semibold text-lg text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-1">{desc}</p>
    </div>
  );

  return (
    <div
      className="
        grid gap-6
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      <Card
        title="Manage Users"
        desc="Create, update and delete users"
        icon={<FaUsers />}
        onClick={() => navigate("/admin/users")}
      />

      <Card
        title="Manage Rooms"
        desc="Add and manage hotel rooms"
        icon={<FaBed />}
        onClick={() => navigate("/admin/rooms")}
      />

      <Card
        title="Customer Bookings"
        desc="View bookings"
        icon={<FaChartLine />}
        onClick={() => navigate("/admin/bookings")}
      />
      <Card
        title="System Overview"
        desc="View bookings & revenue (mock)"
        icon={<FaChartLine />}
        onClick={() => navigate("/admin")}
      />
    </div>
  );
};

export default AdminQuickActionCards;
