import React, { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for large screens */}
      <aside className="hidden md:flex w-64 bg-gray-900 text-white flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">RaFFLe</h2>
        <nav className="space-y-2">
          <Link to="/" className="block p-2 hover:bg-gray-700 rounded">Home</Link>
          <Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link>
          <Link to="/admin" className="block p-2 hover:bg-gray-700 rounded">Admin</Link>
        </nav>
      </aside>

      {/* Mobile Navbar */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">RaFFLe</h2>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              /* X Icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Bars Icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </header>

        {/* Mobile Sidebar */}
        {isOpen && (
          <div className="md:hidden bg-gray-800 text-white p-4 space-y-2">
            <Link to="/" className="block p-2 hover:bg-gray-700 rounded">Home</Link>
            <Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link>
            <Link to="/admin" className="block p-2 hover:bg-gray-700 rounded">Admin</Link>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6"></main>
      </div>
    </div>
  );
};

export default Layout;
