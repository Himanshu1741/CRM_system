import { useState } from "react";
import { Button } from "../components/Button";

export default function Deals() {
  const [deals, setDeals] = useState([]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Deals</h1>
        <Button variant="primary">Add Deal</Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Deal Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Stage
              </th>
            </tr>
          </thead>
          <tbody>
            {deals.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  No deals yet
                </td>
              </tr>
            ) : (
              deals.map((deal) => (
                <tr key={deal.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{deal.name}</td>
                  <td className="px-6 py-3">{deal.customer}</td>
                  <td className="px-6 py-3">${deal.amount}</td>
                  <td className="px-6 py-3">{deal.stage}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
