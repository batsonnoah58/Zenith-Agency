import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import TaskArea from "./pages/TaskArea";
import Profit from "./pages/Profit";
import Account from "./pages/Account";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Wallet from "./pages/Wallet";
import Profits from "./pages/Profits";
import FinancialRecords from "./pages/FinancialRecords";
import DailyStatement from "./pages/DailyStatement";
import TeamReports from "./pages/TeamReports";
import Referrals from "./pages/Referrals";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/signup" element={<Layout><Signup /></Layout>} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><Layout><TaskArea /></Layout></ProtectedRoute>} />
            <Route path="/profit" element={<ProtectedRoute><Layout><Profit /></Layout></ProtectedRoute>} />
            <Route path="/account" element={<ProtectedRoute><Layout><Account /></Layout></ProtectedRoute>} />
            <Route path="/wallet" element={<ProtectedRoute><Layout><Wallet /></Layout></ProtectedRoute>} />
            <Route path="/profits" element={<ProtectedRoute><Layout><Profits /></Layout></ProtectedRoute>} />
            <Route path="/records" element={<ProtectedRoute><Layout><FinancialRecords /></Layout></ProtectedRoute>} />
            <Route path="/daily-statement" element={<ProtectedRoute><Layout><DailyStatement /></Layout></ProtectedRoute>} />
            <Route path="/team-reports" element={<ProtectedRoute><Layout><TeamReports /></Layout></ProtectedRoute>} />
            <Route path="/referrals" element={<ProtectedRoute><Layout><Referrals /></Layout></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><Layout><Leaderboard /></Layout></ProtectedRoute>} />
            <Route path="/support" element={<Layout><Support /></Layout>} />
            <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
            <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />

            {/* IMPORTANT: DO NOT place any routes below this. */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

export default App;