import { useState, useEffect } from "react";

export default function useBookmarks() {
  const [bookmarkedZips, setBookmarkedZips] = useState(() => {
    const saved = localStorage.getItem("bookmarkedZips");
    return saved ? JSON.parse(saved) : [];
  });

  // Keep localStorage updated
  useEffect(() => {
    localStorage.setItem("bookmarkedZips", JSON.stringify(bookmarkedZips));
  }, [bookmarkedZips]);

  const toggleBookmark = (zip) => {
    setBookmarkedZips((prev) =>
      prev.includes(zip) ? prev.filter((z) => z !== zip) : [...prev, zip]
    );
  };

  return { bookmarkedZips, toggleBookmark };
}
