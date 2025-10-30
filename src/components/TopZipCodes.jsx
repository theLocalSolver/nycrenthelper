import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

export default function TopZipCodes({ zipCodes }) {
  const [bookmarked, setBookmarked] = useState([]);

  // Load saved bookmarks on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setBookmarked(saved.map((fav) => fav.id)); // store only IDs for quick checking
  }, []);

  const toggleBookmark = (zip) => {
    const roundedRent = Math.round(zip.properties["Median-Rent"]); // ✅ round to nearest dollar

    const zipData = {
      id: zip.properties.postalCode,
      title: `ZIP Code ${zip.properties.postalCode}`,
      description: `${
        zip.properties.borough
      } — $${roundedRent.toLocaleString()}`,
    };

    let updatedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    if (bookmarked.includes(zipData.id)) {
      // remove
      updatedFavorites = updatedFavorites.filter((f) => f.id !== zipData.id);
    } else {
      // add
      updatedFavorites.push(zipData);
    }

    // save updated
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setBookmarked(updatedFavorites.map((f) => f.id));
  };

  return (
    <div className="mt-6 bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">
        Top 5 Best ZIP Codes for You
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {zipCodes.map((zip) => {
          const id = zip.properties.postalCode;
          const roundedRent = Math.round(zip.properties["Median-Rent"]);
          const isBookmarked = bookmarked.includes(id);

          return (
            <div
              key={id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
            >
              <div>
                <p className="font-semibold text-gray-800 text-lg">{id}</p>
                <p className="text-sm text-gray-600">
                  {zip.properties.borough} — ${roundedRent.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => toggleBookmark(zip)}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isBookmarked
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {isBookmarked ? (
                  <BookmarkCheck size={18} />
                ) : (
                  <Bookmark size={18} />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
