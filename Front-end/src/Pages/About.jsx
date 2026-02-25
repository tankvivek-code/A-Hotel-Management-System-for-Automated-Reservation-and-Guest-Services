const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900">
            About Our Hotel Management System
          </h1>
          <p className="text-slate-600 mt-4">
            A modern platform built to automate hospitality operations and
            improve customer experience.
          </p>
        </div>

        {/* ABOUT CARD */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border space-y-6">
          <p className="text-slate-700 leading-relaxed">
            Our Hotel Management System is a modern web-based application that
            automates daily hotel operations such as room booking, availability
            tracking, billing, and customer management.
          </p>

          <p className="text-slate-700 leading-relaxed">
            The system reduces manual work, eliminates paperwork, and ensures
            accuracy by maintaining all data digitally. It provides a clean and
            user-friendly interface for both customers and hotel staff.
          </p>

          <p className="text-slate-700 leading-relaxed">
            Built using the MERN stack, this system follows modern software
            engineering practices, making it scalable, secure, and suitable for
            real-world hotel environments.
          </p>
        </div>

        {/* OBJECTIVES CARD */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            System Objectives
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Automate room booking and management",
              "Provide real-time room availability",
              "Improve customer convenience",
              "Reduce manual errors and paperwork",
              "Ensure secure and efficient operations",
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl bg-slate-50 hover:bg-white transition"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
