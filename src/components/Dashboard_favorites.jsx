import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

export default function DashboardFavorites({ userData }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // ✅ Load saved favorites from localStorage
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
  }, []);

  const handleRemove = (id) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Favorites</h2>

          {favorites.length === 0 ? (
            <p className="text-gray-600">
              You don’t have any saved favorites yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {favorites.map((fav) => {
                // ✅ Extract and reformat rent if it's in the description string
                let rentDisplay = fav.description;
                const rentMatch = fav.description.match(/\$([\d,]+)/);
                if (rentMatch) {
                  const rentValue = Math.round(
                    parseFloat(rentMatch[1].replace(/,/g, ""))
                  );
                  rentDisplay = fav.description.replace(
                    /\$[\d,]+/,
                    `$${rentValue.toLocaleString()}`
                  );
                }

                return (
                  <li
                    key={fav.id}
                    className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg p-3"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        {fav.title}
                      </h3>
                      <p className="text-xs text-gray-500">{rentDisplay}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(fav.id)}
                      className="flex items-center gap-1 text-red-500 text-sm hover:text-red-600"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
