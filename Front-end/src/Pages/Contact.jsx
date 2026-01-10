const Contact = () => {
  return (
    <div className="bg-slate-50 min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* ===== HEADER ===== */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Contact Us
          </h1>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Have questions or need support? Get in touch with us.
          </p>
        </div>

        {/* ===== CONTACT INFO & FORM ===== */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* CONTACT INFO */}
          <div className="bg-white p-8 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Contact Information
            </h2>

            <p className="text-slate-700">
              <strong>Email:</strong> support@hotelmanagement.com
            </p>
            <p className="text-slate-700">
              <strong>Phone:</strong> +91 98765 43210
            </p>
            <p className="text-slate-700">
              <strong>Address:</strong> Rajkot, Gujarat, India
            </p>

            <p className="text-slate-600 text-sm">
              Our support team is available 24×7 to assist you with your
              queries.
            </p>
          </div>

          {/* CONTACT FORM (MOCK) */}
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Send Us a Message
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded px-4 py-2 focus:outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded px-4 py-2 focus:outline-none"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border rounded px-4 py-2 focus:outline-none"
              ></textarea>

              <button
                type="button"
                className="px-6 py-2 bg-slate-800 text-white rounded hover:bg-slate-900 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
