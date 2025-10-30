import Construction from "../assets/coming_soon.png";
export default function DashboardImmigration({ userData }) {
  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Immigration Resources
          </h1>

          <img src={Construction} alt="" className="w-96 h-auto mx-auto my-4" />
          <h1 className="text-xl text-center font-bold text-gray-500 mb-2">
            Coming Soon!
          </h1>
        </div>
      </div>
    </div>
  );
}
