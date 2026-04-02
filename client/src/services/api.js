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
  deleteDeal: (id) =>
    fetch(`${API_BASE}/deals/${id}`, { method: "DELETE" }).then((r) =>
      r.json(),
    ),
};
