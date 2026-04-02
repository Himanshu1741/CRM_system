import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
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
import { AdvancedFilterPanel } from "../components/AdvancedFilterPanel";
import { communicationsAPI } from "../services/api";

export default function Communications() {
  const [communications, setCommunications] = useState([]);
  const [allCommunications, setAllCommunications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({});
  const [formData, setFormData] = useState({
    type: "call",
    direction: "outbound",
    clientId: "",
    staffId: "",
    contactNumber: "",
    duration: "",
    status: "completed",
    subject: "",
    description: "",
    notes: "",
    followUpDate: "",
  });

  const filterFields = [
    {
      name: "type",
      label: "Type",
      type: "select",
      options: [
        { value: "call", label: "Call" },
        { value: "whatsapp", label: "WhatsApp" },
        { value: "email", label: "Email" },
        { value: "sms", label: "SMS" },
        { value: "meeting", label: "Meeting" },
      ],
    },
    {
      name: "direction",
      label: "Direction",
      type: "select",
      options: [
        { value: "inbound", label: "Inbound" },
        { value: "outbound", label: "Outbound" },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "completed", label: "Completed" },
        { value: "pending", label: "Pending" },
        { value: "scheduled", label: "Scheduled" },
        { value: "missed", label: "Missed" },
      ],
    },
  ];

  useEffect(() => {
    fetchCommunications();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, allCommunications]);

  const fetchCommunications = async () => {
    try {
      setLoading(true);
      const response = await communicationsAPI.getAll();
      setAllCommunications(response.data.data || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch communications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allCommunications];

    Object.keys(filters).forEach((key) => {
      const filterValue = filters[key];
      if (filterValue && filterValue.trim() !== "") {
        filtered = filtered.filter((comm) => {
          const fieldValue = String(comm[key] || "").toLowerCase();
          return fieldValue.includes(filterValue.toLowerCase());
        });
      }
    });

    setCommunications(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleOpenDialog = (comm = null) => {
    if (comm) {
      setEditingId(comm.id);
      setFormData({
        type: comm.type || "call",
        direction: comm.direction || "outbound",
        clientId: comm.clientId || "",
        staffId: comm.staffId || "",
        contactNumber: comm.contactNumber || "",
        duration: comm.duration || "",
        status: comm.status || "completed",
        subject: comm.subject || "",
        description: comm.description || "",
        notes: comm.notes || "",
        followUpDate: comm.followUpDate ? comm.followUpDate.split("T")[0] : "",
      });
    } else {
      setEditingId(null);
      setFormData({
        type: "call",
        direction: "outbound",
        clientId: "",
        staffId: "",
        contactNumber: "",
        duration: "",
        status: "completed",
        subject: "",
        description: "",
        notes: "",
        followUpDate: "",
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
    if (!formData.type || !formData.direction || !formData.staffId) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        staffId: parseInt(formData.staffId),
        clientId: formData.clientId ? parseInt(formData.clientId) : null,
        duration: formData.duration ? parseInt(formData.duration) : null,
      };

      if (editingId) {
        await communicationsAPI.update(editingId, dataToSend);
      } else {
        await communicationsAPI.create(dataToSend);
      }
      await fetchCommunications();
      handleCloseDialog();
      setError("");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to save communication";
      setError(errorMsg);
      console.error("Save error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this communication record?",
      )
    ) {
      try {
        await communicationsAPI.delete(id);
        await fetchCommunications();
        setError("");
      } catch (err) {
        setError("Failed to delete communication");
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
          Communications
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Log Communication
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
              <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Direction</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Staff ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Client ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Contact</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Timestamp</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {communications && communications.length > 0 ? (
              communications.map((comm) => (
                <TableRow key={comm.id} hover>
                  <TableCell>
                    <Chip
                      label={comm.type}
                      size="small"
                      variant="outlined"
                      color={
                        comm.type === "call"
                          ? "primary"
                          : comm.type === "whatsapp"
                            ? "success"
                            : comm.type === "email"
                              ? "info"
                              : "default"
                      }
                    />
                  </TableCell>
                  <TableCell>{comm.direction}</TableCell>
                  <TableCell>{comm.staffId}</TableCell>
                  <TableCell>{comm.clientId || "-"}</TableCell>
                  <TableCell>
                    {comm.contactNumber || comm.subject || "-"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={comm.status}
                      size="small"
                      color={
                        comm.status === "completed"
                          ? "success"
                          : comm.status === "pending"
                            ? "warning"
                            : comm.status === "missed"
                              ? "error"
                              : "info"
                      }
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(comm.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(comm)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(comm.id)}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                  No communications yet. Log your first communication!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingId ? "Edit Communication" : "Log New Communication"}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}
        >
          <TextField
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            fullWidth
            select
            SelectProps={{ native: true }}
            required
          >
            <option value="call">Call</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="meeting">Meeting</option>
          </TextField>
          <TextField
            label="Direction"
            name="direction"
            value={formData.direction}
            onChange={handleInputChange}
            fullWidth
            select
            SelectProps={{ native: true }}
            required
          >
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
          </TextField>
          <TextField
            label="Staff ID"
            name="staffId"
            type="number"
            value={formData.staffId}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Client ID"
            name="clientId"
            type="number"
            value={formData.clientId}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Duration (seconds)"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            fullWidth
            select
            SelectProps={{ native: true }}
          >
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="missed">Missed</option>
          </TextField>
          <TextField
            label="Follow-up Date"
            name="followUpDate"
            type="date"
            value={formData.followUpDate}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
