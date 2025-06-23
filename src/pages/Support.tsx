import * as React from 'react';

const faqs = [
  { q: 'How do I earn money?', a: 'You earn by referring friends and completing tasks. Each referral and task gives you a reward.' },
  { q: 'How do I withdraw my earnings?', a: 'Go to the Profit page and click the Withdraw button. Your request will be processed within 24 hours (mock).' },
  { q: 'How do I contact support?', a: 'Use the contact form below or the live chat widget for assistance.' },
];

const Support = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [chatOpen, setChatOpen] = React.useState(false);
  const [chatInput, setChatInput] = React.useState('');
  const [chatMessages, setChatMessages] = React.useState([
    { from: 'support', text: 'Hi! How can we help you today?' }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { from: 'user', text: chatInput }]);
    setTimeout(() => {
      setChatMessages(msgs => [...msgs, { from: 'support', text: 'This is a mock chat. A real agent will reply soon!' }]);
    }, 1000);
    setChatInput('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full border border-gray-100 space-y-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">Support</h1>
        {/* FAQ Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-blue-900">Frequently Asked Questions</h2>
          <ul className="space-y-2">
            {faqs.map((faq, idx) => (
              <li key={idx}>
                <button
                  className="w-full text-left font-medium text-blue-700 hover:underline focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  {faq.q}
                </button>
                {openFaq === idx && (
                  <div className="mt-1 text-gray-700 bg-blue-50 rounded p-2">{faq.a}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Live Chat Widget */}
        <div className="mb-6">
          <button
            className="bg-yellow-400 text-blue-900 px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition-colors shadow"
            onClick={() => setChatOpen(true)}
          >
            Live Chat
          </button>
          {chatOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative flex flex-col">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                  onClick={() => setChatOpen(false)}
                  aria-label="Close"
                >
                  ×
                </button>
                <h3 className="text-lg font-bold mb-2 text-blue-900">Live Chat (Mock)</h3>
                <div className="flex-1 overflow-y-auto mb-2 max-h-48">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`mb-1 ${msg.from === 'user' ? 'text-right' : 'text-left'}`}>
                      <span className={`inline-block px-2 py-1 rounded ${msg.from === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}>{msg.text}</span>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendChat} className="flex space-x-2">
                  <input
                    className="flex-1 border px-2 py-1 rounded"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Type a message..."
                  />
                  <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Send</button>
                </form>
              </div>
            </div>
          )}
        </div>
        {/* Contact Form */}
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-green-700 font-semibold text-center">
            Thank you for contacting support! We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4 border border-gray-100">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block font-medium mb-1">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} required className="w-full border px-3 py-2 rounded" rows={4} />
            </div>
            <button type="submit" className="w-full bg-yellow-400 text-blue-900 py-2 rounded font-semibold hover:bg-yellow-300 transition-colors shadow">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Support;