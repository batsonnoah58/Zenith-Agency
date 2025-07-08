import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserStore } from "../store/user";
import { LEVELS } from "../utils/levels";
import React from "react";
import type { UserProfile } from "../store/user";

export default function Home() {
  const profile = useUserStore((s) => s.profile);
  const currentLevelConfig = useUserStore((s) => s.currentLevelConfig());
  const tasksRemaining = useUserStore((s) => s.tasksRemaining());

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "KSh 2M+", label: "Total Earnings Paid" },
    { number: "50,000+", label: "Tasks Completed" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 bg-blue-900 text-white px-4 py-2 rounded z-50">Skip to main content</a>
      <main id="main-content" tabIndex={-1} className="outline-none">
    <div className="bg-white">
      {/* Personalized Greeting for Logged-in Users */}
          {profile && currentLevelConfig && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 mb-10 border border-gray-100 text-center"
          >
                <h2 className="text-3xl font-bold text-blue-900 mb-2">Welcome back, {profile.name}!</h2>
                <p className="text-lg text-gray-700 mb-4">Here's your current earning status:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                  <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                    <div className="text-xl font-bold text-blue-600 mb-1">Level {profile.level}</div>
                    <div className="text-gray-700 text-sm">Current Level</div>
                  </div>
              <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                    <div className="text-xl font-bold text-blue-600 mb-1">KSh {profile.investment.toLocaleString()}</div>
                    <div className="text-gray-700 text-sm">Investment</div>
              </div>
              <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                    <div className="text-xl font-bold text-blue-600 mb-1">KSh {currentLevelConfig.payPerTask}</div>
                    <div className="text-gray-700 text-sm">Pay per Task</div>
              </div>
              <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                    <div className="text-xl font-bold text-blue-600 mb-1">{tasksRemaining} / {currentLevelConfig.tasksPerDay}</div>
                    <div className="text-gray-700 text-sm">Tasks Remaining Today</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <Link to="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow">Dashboard</Link>
              <Link to="/tasks" className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors shadow">Tasks</Link>
              <Link to="/profit" className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow">Profit</Link>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 select-all text-sm">
                    https://zenithagency.com/ref/{profile.name}
              </span>
              <button
                className="bg-yellow-400 text-blue-900 px-3 py-1 rounded font-semibold hover:bg-yellow-300 transition-colors shadow text-sm"
                    onClick={() => navigator.clipboard.writeText(`https://zenithagency.com/ref/${profile.name}`)}
              >
                Copy Referral Link
              </button>
            </div>
                {/* Upgrade prompt for Level 1 users */}
                {profile.level === 1 && (
                  <div className="mt-4">
                    <span className="text-yellow-700 font-semibold">Want to earn more? </span>
                    <Link to="/account" className="underline text-blue-700 font-semibold">Upgrade your level</Link> to unlock higher earnings!
                  </div>
                )}
          </motion.div>
        </section>
      )}

      {/* Hero Section */}
          <section role="region" aria-labelledby="hero-heading" className="relative bg-gradient-to-br from-blue-700 via-purple-700 to-blue-900 text-white overflow-hidden py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800/80 via-purple-800/70 to-blue-900/90"></div>
            <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 animate-fade-in-slow">
              <h1 id="hero-heading" className="text-4xl md:text-5xl font-extrabold mb-4 font-sans drop-shadow-lg" style={{textShadow:'0 2px 16px rgba(80,0,120,0.18)'}}>
                Ready to <span className="text-yellow-300">Earn?</span>
            </h1>
              <p className="text-lg md:text-xl mb-4 text-blue-100 animate-fade-in font-semibold tracking-wide">Earn daily. Withdraw instantly.</p>
              <p className="text-base md:text-lg mb-8 text-blue-100 animate-fade-in font-normal">Start for free. Upgrade to unlock higher daily earnings.</p>
              <Link
                to={profile ? "/tasks" : "/signup"}
                className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-blue-900 px-8 py-4 rounded-lg text-lg font-bold hover:brightness-110 transition-all shadow-xl w-full sm:w-auto block focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-2"
                aria-label={profile ? "Go to Tasks" : "Get Started"}
              >
                {profile ? "Go to Tasks" : "Get Started"}
              </Link>
              <div className="text-xs text-blue-100 mt-2 animate-fade-in">No credit card required. Instant activation.</div>
            </div>
      </section>

          {/* Earning Levels Table - enhanced styling */}
          <section role="region" aria-labelledby="levels-heading" className="py-10 bg-gradient-to-r from-blue-50 via-white to-purple-50 animate-fade-in">
            <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow-2xl p-6" style={{ boxShadow: '0 4px 24px 0 rgba(30,41,59,0.08)' }}>
                <h2 id="levels-heading" className="text-2xl font-extrabold text-blue-900 mb-2 text-center font-sans tracking-tight">Updated Salary Structure (KES)</h2>
                <p className="text-center text-gray-500 mb-4 text-sm">All earnings are in Kenyan Shillings (KES). Figures are estimates and may vary.</p>
                <div className="overflow-x-auto rounded-xl">
                  <table className="min-w-full border border-gray-300 text-sm font-sans rounded-xl shadow-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                    <caption className="sr-only">Updated Salary Structure Table</caption>
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-100 via-purple-100 to-yellow-100 text-base text-blue-900 font-bold">
                        <th className="border-t border-l border-gray-300 px-3 py-2 first:rounded-tl-xl last:rounded-tr-xl">Level</th>
                        <th className="border-t border-gray-300 px-3 py-2">Job Bond</th>
                        <th className="border-t border-gray-300 px-3 py-2">Task Quantity</th>
                        <th className="border-t border-gray-300 px-3 py-2">Price/Unit</th>
                        <th className="border-t border-gray-300 px-3 py-2">Daily Wages</th>
                        <th className="border-t border-gray-300 px-3 py-2">Monthly Salary</th>
                        <th className="border-t border-r border-gray-300 px-3 py-2">Annual Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { level: 'Trainee', jobBond: '----', taskQty: 4, priceUnit: 11, daily: 44, monthly: '-', annual: '-' },
                        { level: 'J1', jobBond: '3000', taskQty: 7, priceUnit: 14, daily: 98, monthly: 2940, annual: 35280 },
                        { level: 'J2', jobBond: '10000', taskQty: 15, priceUnit: 22, daily: 330, monthly: 9900, annual: 118800 },
                        { level: 'J3', jobBond: '26000', taskQty: 25, priceUnit: 34, daily: 850, monthly: 25500, annual: 306000 },
                        { level: 'J4', jobBond: '75000', taskQty: 40, priceUnit: 50, daily: 2000, monthly: 60000, annual: 720000 },
                        { level: 'J5', jobBond: '225000', taskQty: 65, priceUnit: 85, daily: 5525, monthly: 165750, annual: 1989000 },
                        { level: 'J6', jobBond: '515000', taskQty: 100, priceUnit: 120, daily: 12000, monthly: 360000, annual: 4320000 },
                        { level: 'J7', jobBond: '810000', taskQty: 150, priceUnit: 150, daily: 22500, monthly: 675000, annual: 8100000 },
                        { level: 'J8', jobBond: '1070000', taskQty: 200, priceUnit: 180, daily: 36000, monthly: 1080000, annual: 12960000 },
                        { level: 'City Partner', jobBond: '6000000', taskQty: 500, priceUnit: 420, daily: 210000, monthly: 6300000, annual: 75600000 },
                      ].map((row, idx) => (
                        <tr
                          key={row.level}
                          className={`text-center transition-colors duration-200 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-yellow-50`}
                          style={{ fontVariantNumeric: 'tabular-nums' }}
                        >
                          <td className="border-l border-b border-gray-300 px-3 py-2 font-semibold text-blue-900">{row.level}</td>
                          <td className="border-b border-gray-300 px-3 py-2 font-mono">{row.jobBond}</td>
                          <td className="border-b border-gray-300 px-3 py-2 font-mono">{row.taskQty}</td>
                          <td className="border-b border-gray-300 px-3 py-2 font-mono">{row.priceUnit}</td>
                          <td className="border-b border-gray-300 px-3 py-2 font-mono">{row.daily}</td>
                          <td className="border-b border-gray-300 px-3 py-2 font-mono">{row.monthly}</td>
                          <td className="border-b border-r border-b border-gray-300 px-3 py-2 font-mono">{row.annual}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-center text-gray-400 mt-3 text-xs font-sans">* For more details on each level, contact support or visit your account page.</div>
              </div>
            </div>
          </section>

          {/* Why Upgrade? */}
          <section role="region" aria-labelledby="why-heading" className="py-8 bg-gradient-to-r from-white via-yellow-50 to-yellow-100 animate-fade-in">
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 id="why-heading" className="text-xl font-extrabold text-yellow-900 mb-4 font-sans">Why Upgrade?</h3>
                <ul className="space-y-2 text-gray-700 text-base">
                  <li className="flex items-center justify-center gap-2 hover:scale-105 transition-transform font-semibold"><span className="text-green-500" aria-hidden="true">✓</span> More daily tasks</li>
                  <li className="flex items-center justify-center gap-2 hover:scale-105 transition-transform font-semibold"><span className="text-green-500" aria-hidden="true">✓</span> Higher pay per task</li>
                  <li className="flex items-center justify-center gap-2 hover:scale-105 transition-transform font-semibold"><span className="text-green-500" aria-hidden="true">✓</span> Access to exclusive rewards</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Single Testimonial */}
          <section role="region" aria-labelledby="testimonial-heading" className="py-8 bg-gradient-to-r from-blue-50 via-white to-purple-50 animate-fade-in">
            <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-900 font-bold text-xl mb-2" aria-label="Jane M. avatar">JM</div>
                <div className="text-2xl text-blue-400 mb-2" aria-hidden="true">“</div>
                <blockquote className="font-semibold mb-1 text-center italic text-blue-900" aria-labelledby="testimonial-heading">
                  I started at Level 1 for free, then upgraded and now I earn every day!
                </blockquote>
                <div className="text-gray-500 text-sm mt-2" id="testimonial-heading">— Jane M.</div>
          </div>
        </div>
      </section>

          {/* FAQ Section (very short) */}
          <section role="region" aria-labelledby="faq-heading" className="py-8 bg-gradient-to-r from-white via-blue-50 to-purple-50 animate-fade-in">
            <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
              <h3 id="faq-heading" className="text-xl font-extrabold text-blue-900 mb-6 text-center font-sans">FAQ</h3>
              <div className="bg-white rounded-2xl shadow p-4">
                <FAQ />
                <div className="text-center mt-4">
                  <Link to="/support" className="text-blue-700 underline text-sm">Still have questions? Contact us</Link>
                </div>
          </div>
        </div>
      </section>

          {/* How It Works Section */}
          <section role="region" aria-labelledby="how-heading" className="py-12 bg-gradient-to-r from-white via-blue-50 to-purple-50 animate-slide-up">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 id="how-heading" className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-8 text-center font-sans tracking-tight animate-fade-in">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { icon: "👤", title: "Sign Up", desc: "Create your free account in seconds." },
                  { icon: "⭐", title: "Choose Your Level", desc: "Start at Level 1 for free or invest to unlock higher levels." },
                  { icon: "✅", title: "Complete Daily Tasks", desc: "Earn money for every task you complete each day." },
                  { icon: "💸", title: "Withdraw Earnings", desc: "Cash out your earnings quickly and securely." }
                ].map((step, idx) => (
                  <div
                    key={step.title}
                    className="text-center bg-white rounded-2xl shadow-lg p-6 transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${idx * 0.12 + 0.2}s` }}
                    aria-label={step.title}
                  >
                    <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-yellow-100 text-blue-700 rounded-full text-2xl font-bold shadow-md" aria-hidden="true">
                      {step.icon}
                    </div>
                    <h3 className="font-semibold mb-1 font-sans text-blue-900 tracking-tight">{step.title}</h3>
                    <p className="text-gray-600 text-sm font-normal">{step.desc}</p>
                </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Earning?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of users who are already earning with Zenith Agency. 
                  Your financial freedom starts Now.
            </p>
            <Link
                  to={profile ? "/tasks" : "/signup"}
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors shadow-lg inline-block"
            >
                  Start Earning Now
            </Link>
          </motion.div>
        </div>
      </section>
        </div>
      </main>
    </>
  );
}

// --- COMPONENTS ---

function LevelCalculator() {
  const [selectedLevel, setSelectedLevel] = React.useState(1);
  const level = LEVELS.find((l) => l.level === selectedLevel);
  return (
    <div className="flex flex-col items-center gap-4">
      <label className="font-semibold">Select Level:</label>
      <select
        className="border rounded px-3 py-2"
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(Number(e.target.value))}
      >
        {LEVELS.map((l) => (
          <option key={l.level} value={l.level}>
            Level {l.level}
          </option>
        ))}
      </select>
      {level && (
        <div className="mt-2 text-blue-900 font-semibold">
          Daily Earnings: KSh {level.tasksPerDay * level.payPerTask}
        </div>
      )}
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = React.useState<number | null>(null);
  const faqs = [
    {
      q: "How do I upgrade?",
      a: "Go to your Account page and click the Upgrade button."
    },
    {
      q: "How do I get paid?",
      a: "Complete tasks, then withdraw your earnings from the Wallet section."
    }
  ];
  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border rounded-lg">
          <button
            className="w-full text-left px-4 py-3 font-semibold text-blue-900 focus:outline-none flex justify-between items-center"
            onClick={() => setOpen(open === idx ? null : idx)}
          >
            {faq.q}
            <span>{open === idx ? "-" : "+"}</span>
          </button>
          {open === idx && (
            <div className="px-4 pb-4 text-gray-700 text-sm animate-fade-in">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}