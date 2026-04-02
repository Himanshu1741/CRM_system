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
import { dealsAPI } from "../services/api";

export default function Deals() {
  const [deals, setDeals] = useState([]);
  const [allDeals, setAllDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({});
  const [formData, setFormData] = useState({
    dealName: "",
    amount: "",
    stage: "prospecting",
    probability: "0",
    expectedCloseDate: "",
    customerId: "",
    description: "",
  });

  const filterFields = [
    {
      name: "dealName",
      label: "Deal Name",
      type: "text",
      placeholder: "Search by deal name...",
    },
    {
      name: "stage",
      label: "Stage",
      type: "select",
      options: [
        { value: "prospecting", label: "Prospecting" },
        { value: "negotiation", label: "Negotiation" },
        { value: "proposal", label: "Proposal" },
        { value: "won", label: "Won" },
        { value: "lost", label: "Lost" },
      ],
    },
    {
      name: "customerId",
      label: "Customer ID",
      type: "text",
      placeholder: "Search by customer ID...",
    },
  ];

  useEffect(() => {
    fetchDeals();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, allDeals]);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const response = await dealsAPI.getAll();
      setAllDeals(response.data.data || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch deals");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allDeals];

    Object.keys(filters).forEach((key) => {
      const filterValue = filters[key];
      if (filterValue && filterValue.trim() !== "") {
        filtered = filtered.filter((deal) => {
          const fieldValue = String(deal[key] || "").toLowerCase();
          return fieldValue.includes(filterValue.toLowerCase());
        });
      }
    });

    setDeals(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleOpenDialog = (deal = null) => {
    if (deal) {
      setEditingId(deal.id);
      setFormData({
        dealName: deal.dealName || "",
        amount: deal.amount || "",
        stage: deal.stage || "prospecting",
        probability: deal.probability || "0",
        expectedCloseDate: deal.expectedCloseDate || "",
        customerId: deal.customerId || "",
        description: deal.description || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        dealName: "",
        amount: "",
        stage: "prospecting",
        probability: "0",
        expectedCloseDate: "",
        customerId: "",
        description: "",
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
    if (!formData.dealName || !formData.amount) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      if (editingId) {
        await dealsAPI.update(editingId, formData);
      } else {
        await dealsAPI.create(formData);
      }
      await fetchDeals();
      handleCloseDialog();
      setError("");
    } catch (err) {
      setError("Failed to save deal");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this deal?")) {
      try {
        await dealsAPI.delete(id);
        await fetchDeals();
        setError("");
      } catch (err) {
        setError("Failed to delete deal");
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
          Deals
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Deal
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
              <TableCell sx={{ fontWeight: "bold" }}>Deal Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Stage</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Probability</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Close Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deals && deals.length > 0 ? (
              deals.map((deal) => (
                <TableRow key={deal.id} hover>
                  <TableCell>{deal.dealName}</TableCell>
                  <TableCell>₹{deal.amount}</TableCell>
                  <TableCell>{deal.stage}</TableCell>
                  <TableCell>{deal.probability}%</TableCell>
                  <TableCell>{deal.expectedCloseDate}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(deal)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(deal.id)}
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
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  No deals yet. Create your first deal!
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
        <DialogTitle>{editingId ? "Edit Deal" : "Add New Deal"}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}
        >
          <TextField
            label="Deal Name"
            name="dealName"
            value={formData.dealName}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Stage"
            name="stage"
            value={formData.stage}
            onChange={handleInputChange}
            fullWidth
            select
            SelectProps={{ native: true }}
          >
            <option value="prospecting">Prospecting</option>
            <option value="negotiation">Negotiation</option>
            <option value="proposal">Proposal</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </TextField>
          <TextField
            label="Probability (%)"
            name="probability"
            type="number"
            inputProps={{ min: 0, max: 100 }}
            value={formData.probability}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Expected Close Date"
            name="expectedCloseDate"
            type="date"
            value={formData.expectedCloseDate}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
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
