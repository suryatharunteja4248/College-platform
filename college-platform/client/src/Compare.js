import { useLocation } from "react-router-dom";

function Compare() {
  const { state } = useLocation();

  if (!state || state.length < 2) {
    return <p>Select at least 2 colleges</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Comparison</h1>

      <table className="table-auto border w-full">
        <thead>
          <tr>
            <th>Field</th>
            {state.map((c) => (
              <th key={c.id}>{c.name}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Fees</td>
            {state.map((c) => (
              <td key={c.id}>₹{c.fees}</td>
            ))}
          </tr>

          <tr>
            <td>Rating</td>
            {state.map((c) => (
              <td key={c.id}>{c.rating}</td>
            ))}
          </tr>

          <tr>
            <td>Location</td>
            {state.map((c) => (
              <td key={c.id}>{c.location}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Compare;