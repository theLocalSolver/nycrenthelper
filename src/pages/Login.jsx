import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider, saveUserData } from "@/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Login successful:", userCredential.user.email);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Failed to login. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log("Starting Google login...");
      // Configure auth for popup
      auth.useDeviceLanguage();
      const result = await signInWithPopup(auth, provider);
      console.log("Google login successful:", result.user.email);

      // Store user data in localStorage
      const userData = {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        createdAt: new Date().toISOString(),
      };
      saveUserData(userData);

      navigate("/dashboard");
    } catch (authError) {
      console.error("Google login error:", authError);
      alert(
        authError.message || "Failed to login with Google. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* 🏠 Back to Home */}
      <Link
        to="/"
        className="absolute top-5 left-5 text-blue-600 hover:underline"
      >
        ← Back to Home
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full mt-4 flex justify-center items-center gap-2"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </Button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
