import React from 'react';

const TermsOfService = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full border border-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-900 text-center">Terms of Service</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-800">Introduction</h2>
        <p className="text-gray-700">By using Zenith Agency, you agree to these Terms of Service. Please read them carefully before using our website and services.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-1 text-blue-800">User Responsibilities</h2>
        <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
          <li>Provide accurate and complete information during registration.</li>
          <li>Keep your account credentials secure.</li>
          <li>Comply with all applicable laws and regulations.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-1 text-blue-800">Account Terms</h2>
        <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
          <li>You must be at least 18 years old to use this service.</li>
          <li>You are responsible for all activity under your account.</li>
          <li>We reserve the right to suspend or terminate accounts for violations.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-1 text-blue-800">Payments</h2>
        <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
          <li>All payments are processed securely.</li>
          <li>Refunds are subject to our refund policy.</li>
          <li>We are not responsible for payment issues caused by third-party providers.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-1 text-blue-800">Prohibited Activities</h2>
        <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
          <li>No unlawful, fraudulent, or abusive activity.</li>
          <li>No spamming, hacking, or attempting to disrupt the service.</li>
          <li>No impersonation of others or misrepresentation.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-1 text-blue-800">Termination</h2>
        <p className="text-gray-700 text-sm">We may suspend or terminate your access to the service at our discretion, with or without notice, for any violation of these terms.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-1 text-blue-800">Limitation of Liability</h2>
        <p className="text-gray-700 text-sm">Zenith Agency is not liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-1 text-blue-800">Changes to Terms</h2>
        <p className="text-gray-700 text-sm">We may update these Terms of Service at any time. Continued use of the service constitutes acceptance of the new terms.</p>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-1 text-blue-800">Contact Information</h2>
        <p className="text-gray-700 text-sm">If you have any questions about these Terms of Service, please contact us at <a href="mailto:support@zenithagency.com" className="text-blue-700 underline">support@zenithagency.com</a>.</p>
      </section>
    </div>
  </div>
);

export default TermsOfService; 