import React from "react";

const FederationTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Institution</th>
          <th>Legitimacy</th>
        </tr>
      </thead>
      <tbody>
        {data?.institutions?.map((inst) => (
          <tr key={inst.id}>
            <td>{inst.name}</td>
            <td>{inst.legitimacy_score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FederationTable;
