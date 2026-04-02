import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { dealsAPI } from "../services/api";

export default function Kanban() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [draggedDeal, setDraggedDeal] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [formData, setFormData] = useState({
    dealName: "",
    amount: "",
    stage: "prospecting",
    probability: "0",
    expectedCloseDate: "",
  });

  const stages = [
    { value: "prospecting", label: "Prospecting", color: "#e3f2fd" },
    { value: "negotiation", label: "Negotiation", color: "#fff3e0" },
    { value: "proposal", label: "Proposal", color: "#f3e5f5" },
    { value: "won", label: "Won", color: "#e8f5e9" },
    { value: "lost", label: "Lost", color: "#ffebee" },
  ];

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const response = await dealsAPI.getAll();
      setDeals(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch deals");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (e, deal) => {
    setDraggedDeal(deal);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, newStage) => {
    e.preventDefault();
    if (!draggedDeal) return;

    if (draggedDeal.stage === newStage) {
      setDraggedDeal(null);
      return;
    }

    try {
      await dealsAPI.update(draggedDeal.id, {
        ...draggedDeal,
        stage: newStage,
      });
      await fetchDeals();
      setDraggedDeal(null);
    } catch (err) {
      setError("Failed to update deal");
      console.error(err);
    }
  };

  const handleEditDeal = (deal) => {
    setEditingDeal(deal);
    setFormData({
      dealName: deal.dealName || "",
      amount: deal.amount || "",
      stage: deal.stage || "prospecting",
      probability: deal.probability || "0",
      expectedCloseDate: deal.expectedCloseDate || "",
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDeal(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await dealsAPI.update(editingDeal.id, formData);
      await fetchDeals();
      handleCloseDialog();
      setError("");
    } catch (err) {
      setError("Failed to save deal");
      console.error(err);
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

  const stageTotals = stages.map((stage) => {
    const stageDeals = deals.filter((d) => d.stage === stage.value);
    const total = stageDeals.reduce((sum, d) => sum + (d.amount || 0), 0);
    return { ...stage, count: stageDeals.length, total };
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          🎯 Kanban Board - Deal Pipeline
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
          Drag and drop deals between stages to update their status
        </Typography>

        {/* Stage Summary */}
        <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 2 }}>
          {stageTotals.map((stage) => (
            <Card
              key={stage.value}
              sx={{
                minWidth: 180,
                backgroundColor: stage.color,
                border: "1px solid #ddd",
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {stage.label}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {stage.count} deals
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
                  ₹{(stage.total / 100000).toFixed(1)}L
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Kanban Columns */}
      <Grid container spacing={2}>
        {stages.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage.value);
          return (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={stage.value}>
              <Box
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.value)}
                sx={{
                  backgroundColor: stage.color,
                  borderRadius: 2,
                  minHeight: "500px",
                  p: 2,
                  border: "2px dashed #ccc",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#666",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    textAlign: "center",
                    borderBottom: "2px solid #ccc",
                    pb: 1,
                  }}
                >
                  {stage.label}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    mb: 2,
                    color: "text.secondary",
                  }}
                >
                  {stageDeals.length} deal{stageDeals.length !== 1 ? "s" : ""}
                </Typography>

                {/* Deal Cards */}
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  {stageDeals.length > 0 ? (
                    stageDeals.map((deal) => (
                      <Card
                        key={deal.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, deal)}
                        onClick={() => handleEditDeal(deal)}
                        sx={{
                          cursor: "grab",
                          backgroundColor: "#fff",
                          border: "1px solid #e0e0e0",
                          "&:hover": {
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            transform: "translateY(-2px)",
                          },
                          "&:active": {
                            cursor: "grabbing",
                          },
                        }}
                      >
                        <CardContent
                          sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                              mb: 0.5,
                              fontSize: "0.9rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            title={deal.dealName}
                          >
                            {deal.dealName}
                          </Typography>

                          <Box sx={{ mb: 0.5 }}>
                            <Typography
                              variant="caption"
                              sx={{ fontWeight: "bold" }}
                            >
                              ₹{(deal.amount || 0).toLocaleString()}
                            </Typography>
                          </Box>

                          {deal.probability && (
                            <Chip
                              label={`${deal.probability}%`}
                              size="small"
                              sx={{
                                backgroundColor: "#e3f2fd",
                                height: 20,
                                fontSize: "0.7rem",
                              }}
                            />
                          )}

                          {deal.expectedCloseDate && (
                            <Typography
                              variant="caption"
                              sx={{
                                display: "block",
                                color: "text.secondary",
                                mt: 0.5,
                                fontSize: "0.7rem",
                              }}
                            >
                              {new Date(
                                deal.expectedCloseDate,
                              ).toLocaleDateString("en-IN")}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "200px",
                        color: "text.secondary",
                        fontStyle: "italic",
                      }}
                    >
                      No deals
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {/* Edit Deal Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Deal</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Deal Name"
                name="dealName"
                value={formData.dealName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Probability (%)"
                name="probability"
                type="number"
                value={formData.probability}
                onChange={handleInputChange}
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Expected Close Date"
                name="expectedCloseDate"
                type="date"
                value={formData.expectedCloseDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
