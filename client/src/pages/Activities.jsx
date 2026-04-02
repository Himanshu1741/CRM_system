import { useState } from "react";
import { Button } from "../components/Button";

export default function Activities() {
  const [activities, setActivities] = useState([]);

  const getActivityTypeColor = (type) => {
    const colors = {
      call: "bg-blue-100 text-blue-800",
      email: "bg-purple-100 text-purple-800",
      meeting: "bg-green-100 text-green-800",
      note: "bg-yellow-100 text-yellow-800",
      task: "bg-orange-100 text-orange-800",
      "status-change": "bg-red-100 text-red-800",
    };
    return colors[type] || "bg-gray-100";
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Activities</h1>
        <Button variant="primary">Log Activity</Button>
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No activities yet
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="mb-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${getActivityTypeColor(activity.type)}`}
                    >
                      {activity.type}
                    </span>
                  </div>
                  <p className="text-gray-700">{activity.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Created by {activity.createdBy} on {activity.createdAt}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
