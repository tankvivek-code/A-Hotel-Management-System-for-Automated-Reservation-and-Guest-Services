const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* ===== HEADER ===== */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            About Our Hotel Management System
          </h1>
          <p className="text-slate-600 mt-4 max-w-3xl mx-auto">
            A Hotel Management System for Automated Hospitality Operations
            designed to simplify hotel workflows and enhance customer
            experience.
          </p>
        </div>

        {/* ===== ABOUT CONTENT ===== */}
        <div className="bg-white p-8 rounded-lg shadow space-y-6">
          <p className="text-slate-700">
            Our Hotel Management System is a modern web-based application that
            automates daily hotel operations such as room booking, availability
            tracking, billing, and customer management.
          </p>

          <p className="text-slate-700">
            The system reduces manual work, eliminates paperwork, and ensures
            accuracy by maintaining all data digitally. It is designed with a
            user-friendly interface so customers and hotel staff can easily
            perform their tasks.
          </p>

          <p className="text-slate-700">
            This project is developed using the MERN stack and follows modern
            software engineering principles, making it scalable, secure, and
            suitable for real-world hotel environments.
          </p>
        </div>

        {/* ===== OBJECTIVES ===== */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            System Objectives
          </h2>

          <ul className="list-disc list-inside text-slate-700 space-y-2">
            <li>Automate room booking and management</li>
            <li>Provide real-time room availability</li>
            <li>Improve customer convenience</li>
            <li>Reduce manual errors and paperwork</li>
            <li>Ensure secure and efficient operations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
