export default function MessageItem({
  sender,
  text,
}: {
  sender: "user" | "bot";
  text: string;
}) {
  return (
    <div
      className={`max-w-xs px-3 py-2 rounded-lg ${
        sender === "user"
          ? "bg-brand-primary text-white self-end ml-auto"
          : "bg-gray-200 text-gray-900 self-start mr-auto"
      }`}
    >
      {text}
    </div>
  );
}
