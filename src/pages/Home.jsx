import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar.jsx";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import DashboardImage from "../assets/dashboard.png";
import MapImage from "../assets/map.png";
import CalculatorImage from "../assets/income.png";
import FeedbackImage from "../assets/feedback.png";
import ZipCodeImage from "../assets/top5zipcode.png";
import RentImage from "../assets/rent.png";
import MissionImage from "../assets/mission.png";
import { auth, getUserData } from "@/firebase";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        const userData = getUserData();
        setUser(userData || { name: u.displayName, email: u.email });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleCTA = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        <div className="flex justify-center items-center text-center px-4 flex-3">
          <div>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight"
              style={{
                fontFamily: "Neue Haas Grotesk Text Pro Bold",
                fontWeight: "900",
              }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-700 to-black">
                Find your affordable home zone
              </span>
              <br />
              <span className="text-gray-500">in </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-t from-green-300 to-green-500">
                New York City.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto">
              Explore your neighborhoods. Powered by real NYC rent data — fast,
              reliable, and accurate.
            </p>

            <Button
              className="my-5 px-8 sm:px-12 py-4 sm:py-6 text-base cursor-pointer"
              onClick={handleCTA}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="m-6 md:m-10 flex flex-col justify-center items-center px-4 bg-white"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
          Explore the Tools
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {[
            {
              title: "Interactive Map",
              desc: "See every NYC neighborhood on the map and find the ones that fit your budget best.",
              img: MapImage,
            },
            {
              title: "Dashboard",
              desc: "View rent trends, compare areas, and get real stats that help you plan smart.",
              img: DashboardImage,
              span: "sm:col-span-2",
            },
            {
              title: "Income-Based Calculator",
              desc: "Enter your income and quickly find out how much rent you can actually afford.",
              img: CalculatorImage,
            },
            {
              title: "Feedback & Support",
              desc: "Got ideas or problems? Tell us! We want to make this site even better for everyone.",
              img: FeedbackImage,
            },
            {
              title: "Top ZIP Codes",
              desc: "Check out the best ZIP codes that match your lifestyle and budget. Save your faves!",
              img: ZipCodeImage,
            },
          ].map((tool, i) => (
            <Card
              key={i}
              title={tool.title}
              description={tool.desc}
              className={`h-auto flex flex-col items-center justify-between text-center p-6 ${
                tool.span || ""
              }`}
            >
              <img
                src={tool.img}
                alt={tool.title}
                className="mt-6 h-40 sm:h-56 md:h-64 object-contain mx-auto"
              />
            </Card>
          ))}
        </div>

        <Button
          className="my-8 w-full sm:w-auto px-12 py-6 text-base"
          onClick={handleCTA}
        >
          Start Now
        </Button>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-gray-50"
      >
        <h2
          className="text-3xl sm:text-4xl font-bold mb-10 text-center"
          style={{
            fontFamily: "Neue Haas Grotesk Text Pro Bold",
          }}
        >
          Built For Every New Worker
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
          <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-100 transition hover:shadow-xl hover:scale-[1.02] duration-300">
            <img
              src={MissionImage}
              alt="Mission"
              className="h-48 sm:h-56 md:h-64 object-contain mb-6"
            />
            <h3 className="text-xl sm:text-2xl font-semibold mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 text-base max-w-md">
              We help new workers find affordable homes in NYC — simple and
              stress-free.
            </p>
          </div>

          <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-100 transition hover:shadow-xl hover:scale-[1.02] duration-300">
            <img
              src={RentImage}
              alt="Goal"
              className="h-48 sm:h-56 md:h-64 object-contain mb-6"
            />
            <h3 className="text-xl sm:text-2xl font-semibold mb-3">Our Goal</h3>
            <p className="text-gray-600 text-base max-w-md">
              To make rent data clear so anyone can find the best area for their
              budget.
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-gray-600 max-w-2xl text-base sm:text-lg">
          Why use this? Because RentHelperNYC gives you real NYC data, clear
          tools, and the confidence to find your perfect home.
        </p>

        <Button
          className="my-8 w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-6 text-base transition-all bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleCTA}
        >
          It's Free to Use
        </Button>
      </section>

      {/* Footer */}
      <section
        id="footer"
        className="bg-gray-900 text-white py-10 px-6 flex flex-col items-center text-center"
      >
        <h2 className="text-2xl font-bold mb-3">Rent Helper NYC</h2>

        <p className="text-gray-300 max-w-xl mb-6 text-sm sm:text-base">
          Created and designed by{" "}
          <span className="font-semibold">Faiyaz Rasul</span> to help people
          explore NYC rent trends and find affordable places to live easily.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <a
            href="#features"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="#mission"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            Mission
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        <div className="border-t border-gray-700 w-full max-w-3xl my-4"></div>

        <p className="text-gray-500 text-xs sm:text-sm">
          © {new Date().getFullYear()} Faiyaz Rasul. All rights reserved. This
          website and its content are protected under copyright law.
        </p>
      </section>
    </div>
  );
}
