import React, { useState } from 'react';
import EarningLevelsTable from '../components/EarningLevelsTable';
import Card from '../components/Card';
import Button from '../components/Button';

const faqs = [
  { q: 'How do I upgrade my earning level?', a: 'Go to your Account page and click the "Recharge / Upgrade Level" button.' },
  { q: 'How do I withdraw my earnings?', a: 'Visit the Wallet page and click the Withdraw button. Follow the instructions.' },
  { q: 'How do referrals work?', a: 'Share your referral link from the Account page. You earn bonuses when your referrals join and participate.' },
  { q: 'How do earnings and management fees work?', a: 'Your daily wage and management fees depend on your level. You earn a daily wage for your tasks, and management fees from your team based on their levels. See the full earning levels table below.' },
];

export default function Support() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [showLevelsModal, setShowLevelsModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Help Center</h1>
      {/* FAQ Section */}
      <Card className="mb-6">
        <div className="font-semibold mb-2">Frequently Asked Questions</div>
        <ul className="space-y-3">
          {faqs.map((faq, i) => (
            <li key={i}>
              <div className="font-medium text-blue-700">Q: {faq.q}</div>
              <div className="text-gray-700 ml-2">A: {faq.a}</div>
              {faq.q.includes('earnings and management fees') && (
                <Button
                  className="bg-blue-600 text-white px-3 py-1 rounded font-semibold hover:bg-blue-700 transition-colors shadow text-xs mt-2"
                  onClick={() => setShowLevelsModal(true)}
                >
                  See Earning Levels Table
                </Button>
              )}
            </li>
          ))}
        </ul>
      </Card>
      {/* Modal for Earning Levels Table */}
      {showLevelsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              onClick={() => setShowLevelsModal(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Earning Levels Table</h2>
            <EarningLevelsTable />
          </div>
        </div>
      )}
      {/* Contact Form */}
      <Card>
        <div className="font-semibold mb-2">Contact Support</div>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border px-3 py-2 rounded"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full border px-3 py-2 rounded"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="How can we help you?"
            className="w-full border px-3 py-2 rounded"
            rows={4}
            value={form.message}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors shadow text-sm">Send Message</Button>
        </form>
        {submitted && <div className="text-green-600 text-center mt-2">Message sent! We'll get back to you soon.</div>}
      </Card>
    </div>
  );
}