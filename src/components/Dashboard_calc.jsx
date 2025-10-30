import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react"; // <-- info icon from lucide-react

export default function DashboardCalc() {
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeType, setIncomeType] = useState("yearly");
  const [incomeError, setIncomeError] = useState("");
  const [recommendedRent, setRecommendedRent] = useState(null);

  const formatCurrency = (num) => {
    return `$${Math.round(num).toLocaleString()}`;
  };

  const handleCalculate = () => {
    if (!incomeAmount) {
      setIncomeError("Please enter your income");
      setRecommendedRent(null);
      return;
    }

    const num = parseFloat(incomeAmount.replace(/,/g, ""));
    if (isNaN(num) || num <= 0) {
      setIncomeError("Please enter a valid positive number");
      setRecommendedRent(null);
      return;
    }

    setIncomeError("");

    // Calculate rent using 30% rule
    let yearlyIncome = incomeType === "monthly" ? num * 12 : num;
    let monthlyRent = (yearlyIncome * 0.3) / 12;

    setRecommendedRent(monthlyRent);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6">Income-Based Rent Calculator</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Income Amount */}
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
                  const raw = e.target.value;
                  const cleaned = raw.replace(/[^0-9.,]/g, "");
                  setIncomeAmount(cleaned);
                }}
                onFocus={() => {
                  setIncomeAmount((v) => (v ? v.replace(/,/g, "") : v));
                }}
                onBlur={() => {
                  if (!incomeAmount) return;
                  const num = parseFloat(incomeAmount.replace(/,/g, ""));
                  if (!isNaN(num)) {
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

          {/* Income Type */}
          <div className="md:col-span-1">
            <label
              htmlFor="incomeType"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Income Type
            </label>
            <div className="relative group">
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

        {/* Info Note */}
        <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-800 text-sm">
          <Info className="w-5 h-5 mt-0.5 text-blue-500 flex-shrink-0" />
          <p>
            We calculate your recommended rent using the{" "}
            <span className="font-semibold">30% rule</span>, which suggests
            spending no more than 30% of your income on housing.
          </p>
        </div>

        {/* Calculate Button */}
        <div>
          <Button onClick={handleCalculate} className="px-6 py-3">
            Calculate
          </Button>
        </div>

        {/* Result */}
        {recommendedRent !== null && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl shadow-sm text-lg font-semibold text-green-800">
            Recommended monthly rent: {formatCurrency(recommendedRent)}
          </div>
        )}
      </div>
    </div>
  );
}
