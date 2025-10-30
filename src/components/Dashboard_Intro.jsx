import { useState } from "react";
import RentMap from "./RentMap";
import TopZipCodes from "./TopZipCodes";
export default function DashboardIntro({ userData }) {
  const [showMap, setShowMap] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeType, setIncomeType] = useState("yearly"); // 'yearly' or 'monthly'
  const [incomeError, setIncomeError] = useState("");
  const [topZipCodes, setTopZipCodes] = useState([]);
  const [selectedBoroughs, setSelectedBoroughs] = useState({
    manhattan: false,
    brooklyn: false,
    queens: false,
    bronx: false,
    statenIsland: false,
  });
  const [rentMin, setRentMin] = useState(1000);
  const [rentMax, setRentMax] = useState(3500);

  return (
    <div className="flex-1 ">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-white to-slate-50 rounded-3xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome, {userData.name}!
              </h1>
              <p className="text-gray-600">{userData.email}</p>
              <p className="text-sm text-gray-500">
                Member since:{" "}
                {new Date(userData.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Income Information
          </h2>
          <p className="text-gray-600 mb-6">
            To help find suitable housing options, please enter your income
            details below. We'll use this information to identify affordable
            areas in NYC that match your budget.
          </p>

          {/* Income Input Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 relative">
                <label
                  htmlFor="incomeAmount"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Enter your income amount
                </label>
                <div className="relative group">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="text-gray-500 text-lg font-medium">$</span>
                  </div>
                  <input
                    type="text"
                    inputMode="decimal"
                    name="incomeAmount"
                    id="incomeAmount"
                    className="block w-full rounded-xl border-2 border-gray-200 pl-8 pr-4 py-3 text-lg bg-gradient-to-b from-white to-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-300 shadow-sm"
                    placeholder="e.g. 100000 or 100,000"
                    value={incomeAmount}
                    onChange={(e) => {
                      // allow digits, commas and dot
                      const raw = e.target.value;
                      const cleaned = raw.replace(/[^0-9.,]/g, "");
                      setIncomeAmount(cleaned);
                    }}
                    onFocus={() => {
                      // remove commas on focus for easier editing
                      setIncomeAmount((v) => (v ? v.replace(/,/g, "") : v));
                    }}
                    onBlur={() => {
                      // format with commas on blur
                      if (!incomeAmount) return;
                      const num = parseFloat(incomeAmount.replace(/,/g, ""));
                      if (!isNaN(num)) {
                        // show integer formatting if whole number, otherwise show up to 2 decimals
                        const formatted = Number.isInteger(num)
                          ? num.toLocaleString("en-US")
                          : num.toLocaleString("en-US", {
                              maximumFractionDigits: 2,
                            });
                        setIncomeAmount(formatted);
                      }
                    }}
                  />
                  <div className="absolute inset-0 rounded-sm pointer-events-none ring-1 ring-black/5"></div>
                </div>
                {incomeError && (
                  <p className="mt-2 text-sm text-red-600">{incomeError}</p>
                )}
              </div>
              <div className="md:col-span-1">
                <label
                  htmlFor="incomeType"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Income Type
                </label>
                <div className="relative group ">
                  <select
                    id="incomeType"
                    name="incomeType"
                    className="block w-full cursor-pointer rounded-xl border-2 border-gray-200 pl-4 pr-10 py-3 text-lg bg-gradient-to-b from-white to-gray-50 text-gray-900 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-300 appearance-none shadow-sm"
                    value={incomeType}
                    onChange={(e) => setIncomeType(e.target.value)}
                  >
                    <option value="yearly">Yearly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm0 14a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 17z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 rounded-sm pointer-events-none ring-1 ring-black/5"></div>
                </div>
              </div>
            </div>

            {/* Filter Options */}
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    Filter Options
                  </h3>
                  <p className="text-sm text-gray-500">
                    Select boroughs to include
                  </p>
                </div>
                <div className="text-sm text-gray-500">Pick one or more</div>
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  {[
                    ["manhattan", "Manhattan"],
                    ["brooklyn", "Brooklyn"],
                    ["queens", "Queens"],
                    ["bronx", "Bronx"],
                    ["statenIsland", "Staten Island"],
                  ].map(([key, label]) => (
                    <label key={key} className="cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!selectedBoroughs[key]}
                        onChange={() =>
                          setSelectedBoroughs((prev) => ({
                            ...prev,
                            [key]: !prev[key],
                          }))
                        }
                        className="sr-only peer"
                      />
                      <span className="inline-flex items-center justify-between w-full space-x-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-150 ease-in-out bg-white text-slate-700 border-gray-200 hover:shadow-md peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600">
                        <span>{label}</span>
                        <svg
                          className="h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                          viewBox="0 0 20 20"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M5 10l3 3 7-8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </label>
                  ))}
                </div>

                {/* Rent Range Column */}
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Desired Rent Range
                    </h4>
                    <p className="text-sm text-gray-500">
                      Choose minimum and maximum rent
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div>
                        Min:{" "}
                        <span className="font-medium">
                          ${rentMin.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        Max:{" "}
                        <span className="font-medium">
                          ${rentMax.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="range-slider relative h-12 px-2.5">
                      <div className="absolute inset-0 flex items-center px-2.5">
                        <div className="relative w-full h-1.5 bg-gray-200 rounded-full">
                          <div
                            className="absolute inset-y-0 bg-blue-500 rounded-full shadow-sm transition-all duration-150 ease-out"
                            style={{
                              left: `${(rentMin / 10000) * 100}%`,
                              right: `${100 - (rentMax / 10000) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <input
                        type="range"
                        min={0}
                        max={10000}
                        step={50}
                        value={rentMin}
                        onChange={(e) => {
                          const newMin = Math.min(
                            Number(e.target.value),
                            rentMax - 50
                          );
                          setRentMin(newMin);
                        }}
                        className="range-input range-input-min"
                      />

                      <input
                        type="range"
                        min={0}
                        max={10000}
                        step={50}
                        value={rentMax}
                        onChange={(e) => {
                          const newMax = Math.max(
                            Number(e.target.value),
                            rentMin + 50
                          );
                          setRentMax(newMax);
                        }}
                        className="range-input range-input-max"
                      />

                      <style>{`
                            .range-input {
                              position: absolute;
                              width: 100%;
                              height: 100%;
                              background: none;
                              pointer-events: none;
                              -webkit-appearance: none;
                              -moz-appearance: none;
                              margin: 0;
                              padding: 0;
                            }

                            .range-input::-webkit-slider-thumb {
                              height: 16px;
                              width: 16px;
                              border-radius: 50%;
                              border: 1.5px solid #3b82f6;
                              background: white;
                              cursor: pointer;
                              pointer-events: all;
                              -webkit-appearance: none;
                              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                              transition: all 0.15s ease-out;
                              margin-top: -7px;
                            }

                            .range-input::-moz-range-thumb {
                              height: 16px;
                              width: 16px;
                              border-radius: 50%;
                              border: 1.5px solid #3b82f6;
                              background: white;
                              cursor: pointer;
                              pointer-events: all;
                              -moz-appearance: none;
                              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                              transition: all 0.15s ease-out;
                            }

                            .range-input::-webkit-slider-runnable-track {
                              width: 100%;
                              height: 1.5px;
                              background: transparent;
                              border: none;
                              pointer-events: none;
                            }

                            .range-input::-moz-range-track {
                              width: 100%;
                              height: 1.5px;
                              background: transparent;
                              border: none;
                              pointer-events: none;
                            }

                            .range-input-min {
                              z-index: 2;
                            }

                            .range-input-max {
                              z-index: 1;
                            }

                            .range-input-min::-webkit-slider-thumb {
                              background: white;
                            }

                            .range-input-max::-webkit-slider-thumb {
                              background: white;
                            }

                            .range-input:hover::-webkit-slider-thumb {
                              transform: scale(1.2);
                              border-color: #2563eb;
                              box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
                            }

                            .range-input:hover::-moz-range-thumb {
                              transform: scale(1.2);
                              border-color: #2563eb;
                              box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
                            }

                            .range-input:active::-webkit-slider-thumb {
                              transform: scale(1.1);
                              background: #f8fafc;
                              border-color: #2563eb;
                            }

                            .range-input:active::-moz-range-thumb {
                              transform: scale(1.1);
                              background: #f8fafc;
                              border-color: #2563eb;
                            }
                            
                            .range-input:focus {
                              outline: none;
                            }
                          `}</style>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="relative w-1/2">
                        <input
                          type="number"
                          min={0}
                          max={10000}
                          step={50}
                          value={rentMin}
                          onChange={(e) => {
                            const val = Number(e.target.value || 0);
                            const clamped = Math.min(val, rentMax - 50);
                            setRentMin(clamped);
                          }}
                          className="w-full rounded-lg border-2 border-gray-200 px-8 py-2 text-sm font-medium transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                          $
                        </span>
                      </div>
                      <div className="relative w-1/2">
                        <input
                          type="number"
                          min={0}
                          max={10000}
                          step={50}
                          value={rentMax}
                          onChange={(e) => {
                            const val = Number(e.target.value || 0);
                            const clamped = Math.max(val, rentMin + 50);
                            setRentMax(clamped);
                          }}
                          className="w-full rounded-lg border-2 border-gray-200 px-8 py-2 text-sm font-medium transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                          $
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                // Clear previous error

                const isAnyBoroughSelected = Object.values(
                  selectedBoroughs
                ).some((value) => value === true);
                if (!isAnyBoroughSelected) {
                  alert("Please select at least one borough.");
                  return;
                }
                setIncomeError("");

                // Parse income
                const raw = (incomeAmount || "")
                  .toString()
                  .replace(/,/g, "")
                  .trim();
                const parsed = parseFloat(raw);

                if (!raw || isNaN(parsed) || parsed <= 0) {
                  setIncomeError(
                    "Please enter a valid income amount greater than 0."
                  );
                  return;
                }

                const income = {
                  amount: parsed,
                  type: incomeType,
                };
                console.log("Income data:", income);

                // ✅ Show the map
                setShowMap(true);
              }}
              className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg shadow-indigo-500/20 transform transition-all duration-200 ease-in-out hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
            </button>

            {showMap && (
              <>
                <RentMap
                  selectedBoroughs={selectedBoroughs}
                  minRent={rentMin}
                  maxRent={rentMax}
                  setTopZipCodes={setTopZipCodes}
                />
                <TopZipCodes zipCodes={topZipCodes} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
