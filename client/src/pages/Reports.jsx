import { useState } from "react";

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState("sales-pipeline");

  const reports = [
    {
      id: "sales-pipeline",
      name: "Sales Pipeline",
      description: "View all deals by stage",
    },
    {
      id: "activity-summary",
      name: "Activity Summary",
      description: "Track all logged activities",
    },
    {
      id: "lead-conversion",
      name: "Lead Conversion",
      description: "Lead to customer conversion rates",
    },
    {
      id: "team-performance",
      name: "Team Performance",
      description: "Individual team member metrics",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        {reports.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              selectedReport === report.id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-white hover:border-blue-400"
            }`}
          >
            <h3 className="font-semibold text-lg">{report.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{report.description}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        {selectedReport === "sales-pipeline" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Sales Pipeline</h2>
            <div className="grid grid-cols-5 gap-4">
              {["Prospect", "Negotiation", "Proposal", "Won", "Lost"].map(
                (stage) => (
                  <div
                    key={stage}
                    className="bg-gray-100 p-4 rounded text-center"
                  >
                    <h3 className="font-semibold">{stage}</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
                    <p className="text-sm text-gray-600">Deals</p>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {selectedReport === "activity-summary" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Activity Summary</h2>
            <div className="space-y-2">
              {["Calls", "Emails", "Meetings", "Notes", "Tasks"].map(
                (activity) => (
                  <div
                    key={activity}
                    className="flex justify-between items-center p-2 border-b"
                  >
                    <span>{activity}</span>
                    <span className="font-semibold">0</span>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {selectedReport === "lead-conversion" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Lead Conversion Rate</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Total Leads</p>
                <p className="text-4xl font-bold text-blue-600">0</p>
              </div>
              <div>
                <p className="text-gray-600">Converted to Customer</p>
                <p className="text-4xl font-bold text-green-600">0%</p>
              </div>
            </div>
          </div>
        )}

        {selectedReport === "team-performance" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Team Performance</h2>
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Team Member</th>
                  <th className="px-4 py-2 text-left">Deals Closed</th>
                  <th className="px-4 py-2 text-left">Revenue</th>
                  <th className="px-4 py-2 text-left">Activities</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td
                    colSpan="4"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
