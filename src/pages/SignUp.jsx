import { useState } from "react";
import { auth, provider, saveUserData } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });

      // Store user data in localStorage
      const userData = {
        uid: userCredential.user.uid,
        name,
        email,
        createdAt: new Date().toISOString(),
      };
      saveUserData(userData);

      navigate("/dashboard");
    } catch (error) {
      setError("Sign-up failed. " + error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      // Configure auth for popup
      auth.useDeviceLanguage();
      const result = await signInWithPopup(auth, provider);

      try {
        // Then try to store user data in Firestore
        await setDoc(doc(db, "users", result.user.uid), {
          name: result.user.displayName,
          email: result.user.email,
          createdAt: new Date().toISOString(),
        });
        navigate("/dashboard");
      } catch (firestoreErr) {
        console.error("Firestore error:", firestoreErr);
        // Even if Firestore fails, we still want to navigate since the user is authenticated
        setError(
          "Warning: User data storage failed, but you can still continue."
        );
        navigate("/dashboard");
      }
    } catch (authErr) {
      console.error("Google auth error:", authErr);
      setError("Google Sign-Up failed. " + authErr.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <Link
        to="/"
        className="absolute top-5 left-5 text-blue-600 hover:underline"
      >
        ← Back to Home
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <Button
          onClick={handleGoogleSignup}
          variant="outline"
          className="w-full flex justify-center items-center gap-2"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </Button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
