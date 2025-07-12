import { FaWallet, FaChartLine, FaFileInvoice, FaCalendarDay, FaUsers, FaGift, FaCog } from "react-icons/fa";

const features = [
  { icon: <FaWallet />, label: "Wallet", link: "/wallet" },
  { icon: <FaChartLine />, label: "Profits", link: "/profits" },
  { icon: <FaFileInvoice />, label: "Records", link: "/records" },
  { icon: <FaCalendarDay />, label: "Daily", link: "/daily-statement" },
  { icon: <FaUsers />, label: "Team", link: "/team-reports" },
  { icon: <FaGift />, label: "Referrals", link: "/referrals" },
  { icon: <FaCog />, label: "Settings", link: "/settings" },
];

export default function ProfileIconGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {features.map((f) => (
        <a key={f.label} href={f.link} className="flex flex-col items-center">
          <div className="text-3xl mb-1">{f.icon}</div>
          <span className="text-xs">{f.label}</span>
        </a>
      ))}
    </div>
  );
} 