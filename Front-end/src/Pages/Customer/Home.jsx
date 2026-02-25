import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import PrimaryButton from "../../Component/PrimaryButton";

const Home = () => {
  const { user } = useContext(AuthContext);

  // 🔑 Decide where buttons should go
  const targetPath = user ? "/userdashboard" : "/login";

  return (
    <div className="bg-white text-slate-800">
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center px-4 py-16"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content Card */}
        <div className="relative max-w-3xl w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-snug">
            Automated Hospitality Operations Made Easy
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Smart hotel management system to automate bookings, manage rooms,
            staff and billing — all from one platform.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <PrimaryButton
              text="View Rooms"
              navigate={targetPath}
              className="px-6 py-2.5 text-sm sm:text-base font-semibold"
            />

            <PrimaryButton
              text="Learn More"
              navigate={targetPath}
              className="!bg-black !text-white px-6 py-2.5 text-sm sm:text-base font-semibold"
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="bg-slate-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">
            Key Features
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Room Booking Automation",
              "Real-Time Room Availability",
              "Secure Booking System",
              "Staff & Admin Management",
              "Automated Billing (Mock Payment)",
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center"
              >
                <h3 className="font-semibold text-slate-800">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ROOM CATEGORIES ================= */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">
          Room Categories
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Single Room",
              price: "₹1,500 – ₹2,000",
              img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
            },
            {
              title: "Double Room",
              price: "₹2,500 – ₹3,000",
              img: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
            },
            {
              title: "Deluxe Room",
              price: "₹4,000 – ₹5,000",
              img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
            },
            {
              title: "Suite",
              price: "₹6,000 – ₹8,000",
              img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            },
          ].map((room, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={room.img}
                alt={room.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-slate-800">
                  {room.title}
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  Comfortable stay with modern amenities.
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  {room.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-slate-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-slate-900">
            Why Choose Our System
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Fast Check-In / Check-Out",
              "Paperless Management",
              "User-Friendly Interface",
              "24×7 Availability",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <p className="font-semibold text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
