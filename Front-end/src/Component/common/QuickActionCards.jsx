import { useNavigate } from "react-router-dom";

const QuickActionCards = () => {
  const navigate = useNavigate();

  const actions = [
    { title: "My Bookings", path: "/my-bookings" },
    { title: "Payment Summary", path: "/payments" },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {actions.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(item.path)}
          className="
            bg-white
            border border-gray-200
            rounded-2xl
            shadow-sm
            cursor-pointer
            flex items-center justify-center
            h-28
            text-lg md:text-xl
            font-semibold
            text-slate-800
            hover:shadow-xl
            hover:-translate-y-1
            hover:bg-gradient-to-r
            hover:from-blue-50
            hover:to-indigo-50
            transition-all duration-300
          "
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default QuickActionCards;
