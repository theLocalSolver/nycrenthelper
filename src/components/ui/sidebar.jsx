import { Home, Globe, Heart, NotebookPen, Calculator } from "lucide-react";

export function Sidebar({
  activePanel = "overview",
  setActivePanel = () => {},
}) {
  const items = [
    { key: "overview", label: "Overview", Icon: Home },
    { key: "calculator", label: "Renting Calculator", Icon: Calculator },
    { key: "immigration", label: "Immigration", Icon: Globe },
    { key: "feedback", label: "Feedback", Icon: NotebookPen },
    { key: "favorites", label: "Favorites", Icon: Heart },
  ];

  return (
    <div className="flex flex-col h-full p-4">
      <nav className="space-y-2">
        {items.map(({ key, label, Icon }) => {
          const active = activePanel === key;
          return (
            <button
              key={key}
              onClick={() => setActivePanel(key)}
              className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                active
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  active ? "text-blue-600" : "text-slate-400"
                }`}
              />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto text-xs text-slate-500 border-t border-gray-100 pt-3">
        Version 0.1 • NYC
      </div>
    </div>
  );
}
