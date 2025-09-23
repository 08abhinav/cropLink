import React from "react";

interface Props {
  title: string;
  value: React.ReactNode;
  accentColor: "blue" | "green" | "purple";
  description?: React.ReactNode;
}

const StatsCard: React.FC<Props> = ({ title, value, accentColor, description }) => {
  const borderClass = {
    blue: "border-blue-500",
    green: "border-green-500",
    purple: "border-purple-500",
  }[accentColor];

  const titleClass = {
    blue: "text-blue-400",
    green: "text-green-400",
    purple: "text-purple-400",
  }[accentColor];

  return (
    <div
      className={`bg-black p-6 rounded-xl shadow-lg hover:shadow-2xl transition border-l-4 ${borderClass} overflow-hidden text-white`}
    >
      <h3 className={`text-2xl font-semibold mb-3 break-words ${titleClass}`}>
        {title}
      </h3>
      <p className="text-gray-400 text-lg">
        {description}{" "}
        <span className="font-extrabold text-white">{value}</span>
      </p>
    </div>
  );
};

export default StatsCard;
