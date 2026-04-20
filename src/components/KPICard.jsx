import React from "react";

function KPICard({ title, value, signature, comment }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-glow hover:scale-105 transition-transform">
      <h3 className="text-aura text-xl font-bold mb-2">{title}</h3>
      <p className="text-ritual text-2xl font-semibold mb-4">{value}</p>
      {comment && (
        <p className="italic text-aura mb-2">💬 {comment}</p>
      )}
      {signature && (
        <p className="font-bold text-ritual">✍️ Signed: {signature}</p>
      )}
    </div>
  );
}

export default KPICard;
