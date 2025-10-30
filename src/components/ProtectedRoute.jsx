import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "@/firebase";

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    console.log("ProtectedRoute - Auth State:", { user, loading });
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, show the protected content
  return children;
}
