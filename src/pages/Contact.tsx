import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // send the form data to  backend or email service
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-blue-900 text-center">Contact Us</h1>
        <p className="text-gray-600 mb-8 text-center">Have a question or need help? Fill out the form below and our team will get back to you soon.</p>
        {submitted ? (
          <div className="text-green-600 text-center font-semibold py-8">Thank you for reaching out! We will respond as soon as possible.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded min-h-[100px]"
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors shadow"
            >
              Send Message
            </button>
          </form>
        )}
        <div className="mt-8 text-center text-gray-500 text-sm">
          Or email us at <a href="mailto:support@zenithagency.com" className="text-blue-700 underline">support@zenithagency.com</a>
        </div>
      </div>
    </div>
  );
};

export default Contact; 