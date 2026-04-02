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
import { AdvancedFilterPanel } from "../components/AdvancedFilterPanel";
import { notesAPI } from "../services/api";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "task",
    linkedId: "",
  });

  const filterFields = [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Search by title...",
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: [
        { value: "task", label: "Task" },
        { value: "customer", label: "Customer" },
        { value: "lead", label: "Lead" },
        { value: "deal", label: "Deal" },
      ],
    },
  ];

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, allNotes]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await notesAPI.getAll();
      setAllNotes(response.data.data || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch notes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allNotes];

    Object.keys(filters).forEach((key) => {
      const filterValue = filters[key];
      if (filterValue && filterValue.trim() !== "") {
        filtered = filtered.filter((note) => {
          const fieldValue = String(note[key] || "").toLowerCase();
          return fieldValue.includes(filterValue.toLowerCase());
        });
      }
    });

    setNotes(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleOpenDialog = (note = null) => {
    if (note) {
      setEditingId(note.id);
      setFormData({
        title: note.title || "",
        content: note.content || "",
        type: note.type || "task",
        linkedId: note.linkedId || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        content: "",
        type: "task",
        linkedId: "",
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
    if (!formData.title || !formData.content) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      if (editingId) {
        await notesAPI.update(editingId, formData);
      } else {
        await notesAPI.create(formData);
      }
      await fetchNotes();
      handleCloseDialog();
      setError("");
    } catch (err) {
      setError("Failed to save note");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await notesAPI.delete(id);
        await fetchNotes();
        setError("");
      } catch (err) {
        setError("Failed to delete note");
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
          Notes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Note
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
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Content</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Linked ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes && notes.length > 0 ? (
              notes.map((note) => (
                <TableRow key={note.id} hover>
                  <TableCell>{note.title}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 300,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {note.content}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        backgroundColor: "#e3f2fd",
                        color: "#1976d2",
                        p: 0.5,
                        borderRadius: 1,
                        display: "inline-block",
                      }}
                    >
                      {note.type}
                    </Typography>
                  </TableCell>
                  <TableCell>{note.linkedId || "-"}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(note)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(note.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No notes found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit Note */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editingId ? "Edit Note" : "Add New Note"}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <MenuItem value="task">Task</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="lead">Lead</MenuItem>
                <MenuItem value="deal">Deal</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Linked ID"
                name="linkedId"
                value={formData.linkedId}
                onChange={handleInputChange}
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
