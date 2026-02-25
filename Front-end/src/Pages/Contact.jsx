const Contact = () => {
  return (
    <div className="bg-slate-50 min-h-screen px-4 py-16">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900">Contact Us</h1>
          <p className="text-slate-600 mt-4">
            Have questions or need support? Our team is here to help you 24×7.
          </p>
        </div>

        {/* CONTACT SECTION */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* LEFT CARD - INFO */}
          <div className="bg-white rounded-2xl p-10 shadow-sm border space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Contact Information
            </h2>

            <div className="space-y-3 text-slate-700">
              <p>
                <strong>Email:</strong> support@hotelmanagement.com
              </p>
              <p>
                <strong>Phone:</strong> +91 98765 43210
              </p>
              <p>
                <strong>Address:</strong> Rajkot, Gujarat, India
              </p>
            </div>

            <div className="pt-4 border-t text-sm text-slate-600">
              Our support team is available 24×7 to assist you with your queries
              and booking support.
            </div>
          </div>

          {/* RIGHT CARD - FORM */}
          <div className="bg-white rounded-2xl p-10 shadow-sm border">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-300 focus:outline-none transition"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-300 focus:outline-none transition"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-300 focus:outline-none transition"
              ></textarea>

              <button
                type="button"
                className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-black transition font-medium"
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
