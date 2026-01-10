import { useNavigate } from "react-router-dom";

const QuickActionCards = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "My Bookings",
      path: "/my-bookings",
    },
    {
      title: "Payment Summary",
      path: "/payments",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {actions.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(item.path)}
          className="bg-white rounded-xl shadow cursor-pointer
                     flex items-center justify-center
                     h-24 text-lg font-semibold text-slate-800
                     hover:shadow-lg hover:scale-[1.02]
                     transition"
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default QuickActionCards;
