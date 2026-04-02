const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const api = {
  // Leads
  getLeads: () => fetch(`${API_BASE}/leads`).then((r) => r.json()),
  getLead: (id) => fetch(`${API_BASE}/leads/${id}`).then((r) => r.json()),
  createLead: (data) =>
    fetch(`${API_BASE}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  updateLead: (id, data) =>
    fetch(`${API_BASE}/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  deleteLead: (id) =>
    fetch(`${API_BASE}/leads/${id}`, { method: "DELETE" }).then((r) =>
      r.json(),
    ),

  // Customers
  getCustomers: () => fetch(`${API_BASE}/customers`).then((r) => r.json()),
  getCustomer: (id) =>
    fetch(`${API_BASE}/customers/${id}`).then((r) => r.json()),
  createCustomer: (data) =>
    fetch(`${API_BASE}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  updateCustomer: (id, data) =>
    fetch(`${API_BASE}/customers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  deleteCustomer: (id) =>
    fetch(`${API_BASE}/customers/${id}`, { method: "DELETE" }).then((r) =>
      r.json(),
    ),

  // Deals
  getDeals: () => fetch(`${API_BASE}/deals`).then((r) => r.json()),
  getDeal: (id) => fetch(`${API_BASE}/deals/${id}`).then((r) => r.json()),
  createDeal: (data) =>
    fetch(`${API_BASE}/deals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  updateDeal: (id, data) =>
    fetch(`${API_BASE}/deals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  deleteDeals: (id) =>
    fetch(`${API_BASE}/deals/${id}`, { method: "DELETE" }).then((r) =>
      r.json(),
    ),

  // Tasks
  getTasks: (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    return fetch(`${API_BASE}/tasks${query ? "?" + query : ""}`).then((r) =>
      r.json(),
    );
  },
  getTask: (id) => fetch(`${API_BASE}/tasks/${id}`).then((r) => r.json()),
  createTask: (data) =>
    fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  updateTask: (id, data) =>
    fetch(`${API_BASE}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  deleteTask: (id) =>
    fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" }).then((r) =>
      r.json(),
    ),

  // Notes
  getNotes: (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    return fetch(`${API_BASE}/notes${query ? "?" + query : ""}`).then((r) =>
      r.json(),
    );
  },
  getNote: (id) => fetch(`${API_BASE}/notes/${id}`).then((r) => r.json()),
  createNote: (data) =>
    fetch(`${API_BASE}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  updateNote: (id, data) =>
    fetch(`${API_BASE}/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  deleteNote: (id) =>
    fetch(`${API_BASE}/notes/${id}`, { method: "DELETE" }).then((r) =>
      r.json(),
    ),

  // Activities
  getActivities: (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    return fetch(`${API_BASE}/activities${query ? "?" + query : ""}`).then(
      (r) => r.json(),
    );
  },
  getActivity: (id) =>
    fetch(`${API_BASE}/activities/${id}`).then((r) => r.json()),
  createActivity: (data) =>
    fetch(`${API_BASE}/activities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  deleteActivity: (id) =>
    fetch(`${API_BASE}/activities/${id}`, { method: "DELETE" }).then((r) =>
      r.json(),
    ),

  // Reports
  getReports: () => fetch(`${API_BASE}/reports`).then((r) => r.json()),
  getSalesPipelineReport: () =>
    fetch(`${API_BASE}/reports/sales-pipeline`).then((r) => r.json()),
  getActivitySummaryReport: () =>
    fetch(`${API_BASE}/reports/activity-summary`).then((r) => r.json()),
  getLeadConversionReport: () =>
    fetch(`${API_BASE}/reports/lead-conversion`).then((r) => r.json()),
  getTeamPerformanceReport: () =>
    fetch(`${API_BASE}/reports/team-performance`).then((r) => r.json()),
};
