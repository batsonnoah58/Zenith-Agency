import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SkipLink from "./SkipLink";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 overflow-x-hidden">
      <SkipLink />
      {/* Floating Elements for theme consistency */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-pulse z-0" aria-hidden="true"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full animate-bounce z-0" aria-hidden="true"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-blue-400/20 rounded-full animate-ping z-0" aria-hidden="true"></div>
      <Navbar />
      <main id="main-content" className="flex-grow relative z-10" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;