import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          CRM System
        </Link>
        <div className="flex gap-6">
          <Link to="/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>
          <Link to="/leads" className="hover:text-blue-400">
            Leads
          </Link>
          <Link to="/customers" className="hover:text-blue-400">
            Customers
          </Link>
          <Link to="/deals" className="hover:text-blue-400">
            Deals
          </Link>
          <Link to="/tasks" className="hover:text-blue-400">
            Tasks
          </Link>
          <Link to="/activities" className="hover:text-blue-400">
            Activities
          </Link>
          <Link to="/notes" className="hover:text-blue-400">
            Notes
          </Link>
          <Link to="/reports" className="hover:text-blue-400">
            Reports
          </Link>
          <Link to="/settings" className="hover:text-blue-400">
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
};
