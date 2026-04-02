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
import { staffAPI } from "../services/api";

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
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
    whatsapp: "",
    position: "",
    department: "",
    status: "active",
    joinDate: "",
    performanceRating: "",
  });

  const filterFields = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Search by first name...",
    },
    {
      name: "position",
      label: "Position",
      type: "text",
      placeholder: "Search by position...",
    },
    {
      name: "department",
      label: "Department",
      type: "text",
      placeholder: "Search by department...",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "on-leave", label: "On Leave" },
      ],
    },
  ];

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, allStaff]);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await staffAPI.getAll();
      setAllStaff(response.data.data || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch staff");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allStaff];

    Object.keys(filters).forEach((key) => {
      const filterValue = filters[key];
      if (filterValue && filterValue.trim() !== "") {
        filtered = filtered.filter((member) => {
          const fieldValue = String(member[key] || "").toLowerCase();
          return fieldValue.includes(filterValue.toLowerCase());
        });
      }
    });

    setStaff(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleOpenDialog = (member = null) => {
    if (member) {
      setEditingId(member.id);
      setFormData({
        firstName: member.firstName || "",
        lastName: member.lastName || "",
        email: member.email || "",
        phone: member.phone || "",
        whatsapp: member.whatsapp || "",
        position: member.position || "",
        department: member.department || "",
        status: member.status || "active",
        joinDate: member.joinDate ? member.joinDate.split("T")[0] : "",
        performanceRating: member.performanceRating || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        whatsapp: "",
        position: "",
        department: "",
        status: "active",
        joinDate: "",
        performanceRating: "",
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
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.position
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        performanceRating: formData.performanceRating
          ? parseFloat(formData.performanceRating)
          : null,
      };

      if (editingId) {
        await staffAPI.update(editingId, dataToSend);
      } else {
        await staffAPI.create(dataToSend);
      }
      await fetchStaff();
      handleCloseDialog();
      setError("");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to save staff member";
      setError(errorMsg);
      console.error("Save error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await staffAPI.delete(id);
        await fetchStaff();
        setError("");
      } catch (err) {
        setError("Failed to delete staff member");
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
          Staff
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Staff Member
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
              <TableCell sx={{ fontWeight: "bold" }}>Position</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff && staff.length > 0 ? (
              staff.map((member) => (
                <TableRow key={member.id} hover>
                  <TableCell>{`${member.firstName} ${member.lastName}`}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>{member.department || "-"}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor:
                          member.status === "active"
                            ? "success.light"
                            : member.status === "on-leave"
                              ? "warning.light"
                              : "error.light",
                        color:
                          member.status === "active"
                            ? "success.dark"
                            : member.status === "on-leave"
                              ? "warning.dark"
                              : "error.dark",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      {member.status}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(member)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(member.id)}
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
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  No staff members yet. Add your first staff member!
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
          {editingId ? "Edit Staff Member" : "Add New Staff Member"}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}
        >
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="WhatsApp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Join Date"
            name="joinDate"
            type="date"
            value={formData.joinDate}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on-leave">On Leave</option>
          </TextField>
          <TextField
            label="Performance Rating (0-5)"
            name="performanceRating"
            type="number"
            inputProps={{ step: "0.1", min: "0", max: "5" }}
            value={formData.performanceRating}
            onChange={handleInputChange}
            fullWidth
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
