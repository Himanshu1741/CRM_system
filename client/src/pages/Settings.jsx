import { Button } from "../components/Button";

export default function Settings() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Company Name
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Theme</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>

          <div className="flex gap-2">
            <Button variant="primary">Save Changes</Button>
            <Button variant="secondary">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
