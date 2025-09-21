export default function NotificationsPanel() {
  const notifications = [
    {
      id: 1,
      title: "Welcome!",
      message: "Welcome to AI Chat. You have 1,250 credits to start with.",
      time: "6m ago",
      status: "success", // You can customize status like "success" or "info"
    },
    {
      id: 2,
      title: "Feature Update",
      message: "New conversation export feature is now available.",
      time: "2h ago",
      status: "info",
    },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 space-y-4">
      <h2 className="font-semibold text-lg text-blue-600">Notifications</h2>
      {notifications.map((n) => (
        <div key={n.id} className="flex items-start gap-2 border-b pb-2">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              n.status === "success" ? "bg-green-500" : "bg-blue-500"
            }`}
          ></div>
          <div className="flex-1">
            <div className="font-semibold text-sm">{n.title}</div>
            <div className="text-sm text-gray-600">{n.message}</div>
            <div className="text-xs text-gray-500">{n.time}</div>
          </div>
        </div>
      ))}
      <div className="text-right text-blue-500 text-sm cursor-pointer">
        Mark all read
      </div>
    </div>
  );
}
