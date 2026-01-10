const Services = () => {
  const services = [
    {
      title: "Room Booking Management",
      desc: "Easy and fast room booking with real-time availability and instant confirmation.",
    },
    {
      title: "Automated Check-In & Check-Out",
      desc: "Quick digital check-in and check-out process without paperwork.",
    },
    {
      title: "Secure Payment Processing",
      desc: "Safe and reliable payment handling with multiple payment options.",
    },
    {
      title: "Room & Category Management",
      desc: "Different room categories like Single, Double, Deluxe, and Suite.",
    },
    {
      title: "Booking History & Tracking",
      desc: "Customers can view current and past bookings anytime.",
    },
    {
      title: "24×7 Online Availability",
      desc: "System accessible anytime, anywhere for customers and staff.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* ===== PAGE HEADER ===== */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Our Services
          </h1>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Our Hotel Management System provides smart and automated services
            designed to simplify hotel operations and improve customer
            experience.
          </p>
        </div>

        {/* ===== SERVICES GRID ===== */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {service.title}
              </h3>
              <p className="text-slate-600 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>

        {/* ===== WHY OUR SERVICES ===== */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
            Why Choose Our Services?
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-center">
            <div className="border rounded p-4">
              <p className="font-semibold">Fast & Reliable</p>
            </div>
            <div className="border rounded p-4">
              <p className="font-semibold">Paperless System</p>
            </div>
            <div className="border rounded p-4">
              <p className="font-semibold">User-Friendly Interface</p>
            </div>
            <div className="border rounded p-4">
              <p className="font-semibold">Scalable Architecture</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
