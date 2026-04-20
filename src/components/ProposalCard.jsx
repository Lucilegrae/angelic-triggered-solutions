import React from "react";

function ProposalCard({ title, status, stakeholder, narration, comment, signature }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-glow hover:scale-105 transition-transform">
      <h3 className="text-aura text-xl font-bold mb-2">{title}</h3>
      <p className="text-ritual text-lg font-semibold mb-2">Status: {status}</p>
      <p className="text-white mb-2">{narration}</p>
      <p className="text-sm text-gray-400 mb-2">Stakeholder: {stakeholder}</p>
      {comment && (
        <p className="italic text-aura mb-2">💬 {comment}</p>
      )}
      {signature && (
        <p className="font-bold text-ritual">✍️ Signed: {signature}</p>
      )}
    </div>
  );
}

export default ProposalCard;
