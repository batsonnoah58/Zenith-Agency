import * as React from 'react';

const PrivacyPolicy = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full border border-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-900 text-center">Privacy Policy</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-800">Introduction</h2>
        <p className="text-gray-700">Your privacy is important to us. This Privacy Policy explains how Zenith Agency collects, uses, and protects your personal information when you use our website and services.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-1 text-blue-800">Information We Collect</h2>
        <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
          <li>Personal information you provide (such as name, email, phone number, etc.)</li>
          <li>Account and profile information</li>
          <li>Usage data (pages visited, actions taken, etc.)</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-1 text-blue-800">How We Use Information</h2>
        <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
          <li>To provide and improve our services</li>
          <li>To communicate with you about your account or updates</li>
          <li>To personalize your experience</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-1 text-blue-800">Cookies</h2>
        <p className="text-gray-700 text-sm">We use cookies and similar technologies to enhance your experience, analyze usage, and deliver relevant content. You can control cookies through your browser settings.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-1 text-blue-800">Data Security</h2>
        <p className="text-gray-700 text-sm">We implement reasonable security measures to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-1 text-blue-800">Your Rights</h2>
        <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
          <li>You can access, update, or delete your personal information at any time.</li>
          <li>You can opt out of marketing communications.</li>
          <li>Contact us for any privacy-related requests.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-1 text-blue-800">Changes to This Policy</h2>
        <p className="text-gray-700 text-sm">We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page.</p>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-1 text-blue-800">Contact Information</h2>
        <p className="text-gray-700 text-sm">If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:support@zenithagency.com" className="text-blue-700 underline">support@zenithagency.com</a>.</p>
      </section>
    </div>
  </div>
);

export default PrivacyPolicy; 