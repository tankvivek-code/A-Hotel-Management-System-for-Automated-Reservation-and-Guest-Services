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
    <div className="bg-slate-50 min-h-screen px-4 py-16">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900">Our Services</h1>
          <p className="text-slate-600 mt-4">
            Smart and automated services designed to simplify hotel operations
            and improve customer experience.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* WHY SECTION */}
        <div className="bg-white border rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-center mb-8">
            Why Choose Our Services?
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center">
            {[
              "Fast & Reliable",
              "Paperless System",
              "User-Friendly Interface",
              "Scalable Architecture",
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 border rounded-xl hover:bg-slate-50 transition"
              >
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
