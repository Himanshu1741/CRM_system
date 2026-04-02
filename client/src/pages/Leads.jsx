import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AdvancedFilterPanel from "../components/AdvancedFilterPanel";
import { leadsAPI } from "../services/api";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [allLeads, setAllLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    status: "new",
    source: "website",
    notes: "",
  });

  const filterFields = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Search by first name...",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Search by last name...",
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Search by email...",
    },
    {
      name: "company",
      label: "Company",
      type: "text",
      placeholder: "Search by company...",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "new", label: "New" },
        { value: "contacted", label: "Contacted" },
        { value: "qualified", label: "Qualified" },
        { value: "lost", label: "Lost" },
      ],
    },
    {
      name: "source",
      label: "Source",
      type: "select",
      options: [
        { value: "website", label: "Website" },
        { value: "referral", label: "Referral" },
        { value: "cold_call", label: "Cold Call" },
        { value: "email", label: "Email" },
      ],
    },
  ];

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, allLeads]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await leadsAPI.getAll();
      setAllLeads(response.data.data || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch leads");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allLeads];

    Object.keys(filters).forEach((key) => {
      const filterValue = filters[key];
      if (filterValue && filterValue.trim() !== "") {
        filtered = filtered.filter((lead) => {
          const fieldValue = String(lead[key] || "").toLowerCase();
          return fieldValue.includes(filterValue.toLowerCase());
        });
      }
    });

    setLeads(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleOpenDialog = (lead = null) => {
    if (lead) {
      setEditingId(lead.id);
      setFormData({
        firstName: lead.firstName || "",
        lastName: lead.lastName || "",
        email: lead.email || "",
        phone: lead.phone || "",
        company: lead.company || "",
        status: lead.status || "new",
        source: lead.source || "website",
        notes: lead.notes || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        status: "new",
        source: "website",
        notes: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      if (editingId) {
        await leadsAPI.update(editingId, formData);
      } else {
        await leadsAPI.create(formData);
      }
      await fetchLeads();
      handleCloseDialog();
      setError("");
    } catch (err) {
      setError("Failed to save lead");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await leadsAPI.delete(id);
        await fetchLeads();
        setError("");
      } catch (err) {
        setError("Failed to delete lead");
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Leads
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Lead
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <AdvancedFilterPanel
        filterFields={filterFields}
        filters={filters}
        onFilterChange={handleFilterChange}
        sx={{ mb: 3 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Company</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads && leads.length > 0 ? (
              leads.map((lead) => (
                <TableRow key={lead.id} hover>
                  <TableCell>{`${lead.firstName} ${lead.lastName}`}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        backgroundColor:
                          lead.status === "new" ? "#e3f2fd" : "#f3e5f5",
                        color: lead.status === "new" ? "#1976d2" : "#7b1fa2",
                        p: 0.5,
                        borderRadius: 1,
                        display: "inline-block",
                      }}
                    >
                      {lead.status}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(lead)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(lead.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No leads found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit Lead */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editingId ? "Edit Lead" : "Add New Lead"}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="contacted">Contacted</MenuItem>
                <MenuItem value="qualified">Qualified</MenuItem>
                <MenuItem value="lost">Lost</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Source"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
              >
                <MenuItem value="website">Website</MenuItem>
                <MenuItem value="referral">Referral</MenuItem>
                <MenuItem value="cold_call">Cold Call</MenuItem>
                <MenuItem value="email">Email</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
