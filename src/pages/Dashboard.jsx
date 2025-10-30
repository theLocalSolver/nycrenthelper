import { useState, useEffect } from "react";
import { auth, getUserData } from "@/firebase";
import { useNavigate } from "react-router-dom";
import DashboardNav from "@/components/DashboardNav";
import { Sidebar } from "@/components/ui/sidebar";
import DashboardIntro from "../components/Dashboard_Intro";
import DashboardFeedback from "../components/Dashboard_Feedback";
import DashboardImmigration from "../components/Dashboard_immigration";
import DashboardFavorites from "../components/Dashboard_favorites";
import DashboardCalc from "../components/Dashboard_calc";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePanel, setActivePanel] = useState("overview");

  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate("/login");
          return;
        }

        const data = getUserData();
        if (data) setUserData(data);
        else {
          setUserData({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            createdAt: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error("Dashboard - Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            No user data found
          </h2>
          <p className="text-gray-600 mt-2">Please try logging in again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-slate-800">
      <DashboardNav />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar only on desktop */}
        <aside className="hidden md:flex md:flex-col w-64 flex-none border-r border-gray-100">
          <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activePanel === "overview" && <DashboardIntro userData={userData} />}
          {activePanel === "feedback" && (
            <DashboardFeedback userData={userData} />
          )}
          {activePanel === "calculator" && (
            <DashboardCalc userData={userData} />
          )}
          {activePanel === "immigration" && (
            <DashboardImmigration userData={userData} />
          )}
          {activePanel === "favorites" && (
            <DashboardFavorites userData={userData} />
          )}
        </main>
      </div>
    </div>
  );
}
