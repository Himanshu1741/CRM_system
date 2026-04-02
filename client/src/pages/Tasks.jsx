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
import { tasksAPI } from "../services/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({});
  const [formData, setFormData] = useState({
    taskName: "",
    assignedTo: "",
    dueDate: "",
    priority: "medium",
    status: "todo",
    description: "",
  });

  const filterFields = [
    {
      name: "taskName",
      label: "Task Name",
      type: "text",
      placeholder: "Search by task name...",
    },
    {
      name: "assignedTo",
      label: "Assigned To",
      type: "text",
      placeholder: "Search by assignee...",
    },
    {
      name: "priority",
      label: "Priority",
      type: "select",
      options: [
        { value: "high", label: "High" },
        { value: "medium", label: "Medium" },
        { value: "low", label: "Low" },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "todo", label: "To Do" },
        { value: "in-progress", label: "In Progress" },
        { value: "completed", label: "Completed" },
      ],
    },
  ];

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, allTasks]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getAll();
      setAllTasks(response.data.data || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allTasks];

    Object.keys(filters).forEach((key) => {
      const filterValue = filters[key];
      if (filterValue && filterValue.trim() !== "") {
        filtered = filtered.filter((task) => {
          const fieldValue = String(task[key] || "").toLowerCase();
          return fieldValue.includes(filterValue.toLowerCase());
        });
      }
    });

    setTasks(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleOpenDialog = (task = null) => {
    if (task) {
      setEditingId(task.id);
      setFormData({
        taskName: task.taskName || "",
        assignedTo: task.assignedTo || "",
        dueDate: task.dueDate || "",
        priority: task.priority || "medium",
        status: task.status || "todo",
        description: task.description || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        taskName: "",
        assignedTo: "",
        dueDate: "",
        priority: "medium",
        status: "todo",
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
    if (!formData.taskName || !formData.assignedTo || !formData.dueDate) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      if (editingId) {
        await tasksAPI.update(editingId, formData);
      } else {
        await tasksAPI.create(formData);
      }
      await fetchTasks();
      handleCloseDialog();
      setError("");
    } catch (err) {
      setError("Failed to save task");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await tasksAPI.delete(id);
        await fetchTasks();
        setError("");
      } catch (err) {
        setError("Failed to delete task");
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
          Tasks
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Task
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
              <TableCell sx={{ fontWeight: "bold" }}>Task Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Assigned To</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Due Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow key={task.id} hover>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        backgroundColor:
                          task.priority === "high"
                            ? "#ffebee"
                            : task.priority === "medium"
                              ? "#fff8e1"
                              : "#e8f5e9",
                        color:
                          task.priority === "high"
                            ? "#c62828"
                            : task.priority === "medium"
                              ? "#f57f17"
                              : "#2e7d32",
                        p: 0.5,
                        borderRadius: 1,
                        display: "inline-block",
                      }}
                    >
                      {task.priority}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        backgroundColor:
                          task.status === "todo"
                            ? "#e3f2fd"
                            : task.status === "in-progress"
                              ? "#f3e5f5"
                              : "#e8f5e9",
                        color:
                          task.status === "todo"
                            ? "#1976d2"
                            : task.status === "in-progress"
                              ? "#7b1fa2"
                              : "#2e7d32",
                        p: 0.5,
                        borderRadius: 1,
                        display: "inline-block",
                      }}
                    >
                      {task.status}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(task)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(task.id)}
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
                  No tasks found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit Task */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editingId ? "Edit Task" : "Add New Task"}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Name"
                name="taskName"
                value={formData.taskName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Assigned To"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Due Date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
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
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
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
