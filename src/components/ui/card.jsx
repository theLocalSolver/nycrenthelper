export default function Card({
  title,
  description,
  image, // 🆕 add image prop
  children,
  className = "",
}) {
  return (
    <div
      className={`bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition overflow-hidden ${className}`}
    >
      {/* 🖼️ Image section */}
      {image && (
        <img
          src={image}
          alt={title || "Card image"}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />
      )}

      {/* 📝 Text content */}
      {title && (
        <h3
          style={{
            fontFamily: "Neue Haas Grotesk Text Pro Bold",
          }}
          className="text-2xl font-semibold mb-2"
        >
          {title}
        </h3>
      )}
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      {children}
    </div>
  );
}
