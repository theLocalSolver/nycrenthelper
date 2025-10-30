import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Search, Bell, User } from "lucide-react";

export default function DashboardNav() {
  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* left: brand */}
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

          {/* center: navigation */}
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <h1>Dashboard</h1>
          </div>

          {/* right: actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-md text-slate-500 hover:bg-gray-100 hover:text-slate-700 transition">
              <Search className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-md text-slate-500 hover:bg-gray-100 hover:text-slate-700 transition">
              <Bell className="h-4 w-4" />
            </button>

            <button className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-200 to-white flex items-center justify-center text-slate-600 border border-gray-100">
                <User className="h-4 w-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
