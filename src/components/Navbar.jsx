import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, getUserData } from "@/firebase";
import { signOut } from "firebase/auth";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (u) {
        const userData = getUserData();
        setUser(userData || { name: u.displayName, email: u.email });
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  if (location.pathname === "/login" || location.pathname === "/signup")
    return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      navigate("/");
      setOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Smooth scroll function
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="relative bg-white border-b border-gray-100 shadow-sm z-50">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            aria-label="Go to home"
            className="flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold">RH</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800">
                RentHelper
              </div>
              <div className="text-xs text-slate-400">NYC Housing</div>
            </div>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("features")}
            className="text-gray-700 hover:text-blue-600 font-semibold"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("mission")}
            className="text-gray-700 hover:text-blue-600 font-semibold"
          >
            Mission
          </button>
          <button
            onClick={() => scrollToSection("footer")}
            className="text-gray-700 hover:text-blue-600 font-semibold"
          >
            Info & Contacts
          </button>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex flex-col text-right">
                <span className="text-sm font-semibold">{user.name}</span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>
              <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="cursor-pointer" variant="outline">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="cursor-pointer">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-md z-40">
          <div className="flex flex-col px-4 py-4 gap-3">
            <button
              onClick={() => {
                scrollToSection("features");
                setOpen(false);
              }}
              className="text-gray-700 hover:text-blue-600"
            >
              Features
            </button>
            <button
              onClick={() => {
                scrollToSection("mission");
                setOpen(false);
              }}
              className="text-gray-700 hover:text-blue-600"
            >
              Mission
            </button>
            <button
              onClick={() => {
                scrollToSection("footer");
                setOpen(false);
              }}
              className="text-gray-700 hover:text-blue-600"
            >
              Info & Contacts
            </button>

            <div className="border-t border-gray-200 mt-2 pt-3"></div>

            {user ? (
              <>
                <div className="text-sm font-semibold">{user.name}</div>
                <div className="text-xs text-gray-500 mb-2">{user.email}</div>
                <Button
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/dashboard");
                    setOpen(false);
                  }}
                >
                  Dashboard
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
