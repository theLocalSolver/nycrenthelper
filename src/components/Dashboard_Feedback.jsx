import { useState, useEffect } from "react";

export default function DashboardFeedback({ userData }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  // Load saved feedbacks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("userFeedback");
    if (saved) setFeedbackList(JSON.parse(saved));
  }, []);

  // Save feedback list whenever updated
  useEffect(() => {
    localStorage.setItem("userFeedback", JSON.stringify(feedbackList));
  }, [feedbackList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newFeedback = {
      id: Date.now(),
      message: message.trim(),
      email: userData?.email || "Anonymous",
      date: new Date().toLocaleString(),
    };

    setFeedbackList((prev) => [newFeedback, ...prev]);
    setMessage("");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const deleteFeedback = (id) => {
    setFeedbackList((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Feedback Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Feedback</h2>
          <p className="text-gray-600 mb-4">
            Send us your thoughts or report an issue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
              placeholder="What's on your mind?"
            />
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                Send Feedback
              </button>
              {sent && (
                <div className="text-sm text-green-600">
                  ✅ Thanks — feedback saved locally!
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Previous Feedback Section */}
        {feedbackList.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Your Previous Feedback
            </h3>
            <ul className="space-y-3">
              {feedbackList.map((f) => (
                <li
                  key={f.id}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-start"
                >
                  <div>
                    <p className="text-gray-800 text-sm">{f.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {f.email} — {f.date}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteFeedback(f.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
