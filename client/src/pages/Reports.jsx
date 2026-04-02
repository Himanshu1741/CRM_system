import FileDownloadIcon from "@mui/icons-material/FileDownload";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  activitiesAPI,
  customersAPI,
  dealsAPI,
  leadsAPI,
  notesAPI,
  tasksAPI,
} from "../services/api";

const modules = [
  { value: "leads", label: "Leads", api: leadsAPI },
  { value: "customers", label: "Customers", api: customersAPI },
  { value: "deals", label: "Deals", api: dealsAPI },
  { value: "tasks", label: "Tasks", api: tasksAPI },
  { value: "activities", label: "Activities", api: activitiesAPI },
  { value: "notes", label: "Notes", api: notesAPI },
];

const columnConfig = {
  leads: [
    { key: "id", label: "ID" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "company", label: "Company" },
    { key: "status", label: "Status" },
    { key: "source", label: "Source" },
    { key: "notes", label: "Notes" },
    { key: "createdAt", label: "Created At" },
  ],
  customers: [
    { key: "id", label: "ID" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "company", label: "Company" },
    { key: "industry", label: "Industry" },
    { key: "status", label: "Status" },
    { key: "notes", label: "Notes" },
    { key: "createdAt", label: "Created At" },
  ],
  deals: [
    { key: "id", label: "ID" },
    { key: "dealName", label: "Deal Name" },
    { key: "amount", label: "Amount" },
    { key: "stage", label: "Stage" },
    { key: "probability", label: "Probability" },
    { key: "expectedCloseDate", label: "Expected Close Date" },
    { key: "customerId", label: "Customer ID" },
    { key: "description", label: "Description" },
    { key: "createdAt", label: "Created At" },
  ],
  tasks: [
    { key: "id", label: "ID" },
    { key: "taskName", label: "Task Name" },
    { key: "assignedTo", label: "Assigned To" },
    { key: "dueDate", label: "Due Date" },
    { key: "priority", label: "Priority" },
    { key: "status", label: "Status" },
    { key: "description", label: "Description" },
    { key: "createdAt", label: "Created At" },
  ],
  activities: [
    { key: "id", label: "ID" },
    { key: "activityType", label: "Activity Type" },
    { key: "description", label: "Description" },
    { key: "relatedTo", label: "Related To" },
    { key: "activityDate", label: "Activity Date" },
    { key: "createdAt", label: "Created At" },
  ],
  notes: [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "content", label: "Content" },
    { key: "type", label: "Type" },
    { key: "linkedId", label: "Linked ID" },
    { key: "createdAt", label: "Created At" },
  ],
};

export default function Reports() {
  const [selectedModule, setSelectedModule] = useState("leads");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(
    columnConfig.leads.map((col) => col.key),
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setSelectedColumns(columnConfig[selectedModule].map((col) => col.key));
  }, [selectedModule]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const moduleConfig = modules.find((m) => m.value === selectedModule);
      const response = await moduleConfig.api.getAll();
      setData(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  const handleColumnToggle = (columnKey) => {
    setSelectedColumns((prev) =>
      prev.includes(columnKey)
        ? prev.filter((col) => col !== columnKey)
        : [...prev, columnKey],
    );
  };

  const filterDataByDate = () => {
    if (!startDate && !endDate) return data;

    return data.filter((item) => {
      const itemDate = new Date(item.createdAt);
      const start = startDate ? new Date(startDate) : new Date("1900-01-01");
      const end = endDate ? new Date(endDate) : new Date("2099-12-31");

      return itemDate >= start && itemDate <= end;
    });
  };

  const exportToCSV = () => {
    const filteredData = filterDataByDate();

    if (filteredData.length === 0) {
      alert("No data to export");
      return;
    }

    // Prepare CSV header
    const columns = columnConfig[selectedModule]
      .filter((col) => selectedColumns.includes(col.key))
      .map((col) => col.label);
    const header = columns.join(",") + "\n";

    // Prepare CSV rows
    const rows = filteredData
      .map((item) => {
        return columnConfig[selectedModule]
          .filter((col) => selectedColumns.includes(col.key))
          .map((col) => {
            const value = item[col.key];
            if (value === null || value === undefined) return "";
            if (typeof value === "string" && value.includes(",")) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return String(value);
          })
          .join(",");
      })
      .join("\n");

    const csv = header + rows;

    // Create blob and download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    const timestamp = new Date().toISOString().split("T")[0];
    link.setAttribute("href", url);
    link.setAttribute("download", `${selectedModule}_report_${timestamp}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = filterDataByDate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        📋 Advanced Reports & Export
      </Typography>

      {/* Module & Date Selection */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Select Module</InputLabel>
              <Select
                value={selectedModule}
                label="Select Module"
                onChange={(e) => setSelectedModule(e.target.value)}
              >
                {modules.map((mod) => (
                  <MenuItem key={mod.value} value={mod.value}>
                    {mod.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              sx={{ height: 56 }}
            >
              Load Data
            </Button>
          </Grid>
        </Grid>

        {/* Data Stats */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Typography variant="body2">
            <strong>Total Records:</strong> {data.length}
          </Typography>
          <Typography variant="body2">
            <strong>Filtered Records:</strong> {filteredData.length}
          </Typography>
          {startDate || endDate ? (
            <Typography variant="body2" sx={{ color: "#1976d2" }}>
              <strong>Date Range:</strong> {startDate || "Any"} to{" "}
              {endDate || "Any"}
            </Typography>
          ) : null}
        </Box>
      </Paper>

      {/* Column Selection */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Select Columns to Export
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 3,
              }}
            >
              <CircularProgress size={30} />
            </Box>
          ) : (
            <Grid container spacing={1}>
              {columnConfig[selectedModule].map((col) => (
                <Grid item xs={12} sm={6} md={4} key={col.key}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedColumns.includes(col.key)}
                        onChange={() => handleColumnToggle(col.key)}
                      />
                    }
                    label={col.label}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Export Button */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<FileDownloadIcon />}
          onClick={exportToCSV}
          disabled={loading || filteredData.length === 0}
          size="large"
        >
          Download CSV
        </Button>
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          {filteredData.length > 0
            ? `${filteredData.length} records ready to export`
            : "No records to export"}
        </Typography>
      </Stack>

      {/* Data Preview */}
      {filteredData.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              📊 Data Preview (First 5 records)
            </Typography>

            <Box sx={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.85rem",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#f5f5f5",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    {columnConfig[selectedModule]
                      .filter((col) => selectedColumns.includes(col.key))
                      .map((col) => (
                        <th
                          key={col.key}
                          style={{
                            padding: "12px",
                            textAlign: "left",
                            fontWeight: "bold",
                          }}
                        >
                          {col.label}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(0, 5).map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                      {columnConfig[selectedModule]
                        .filter((col) => selectedColumns.includes(col.key))
                        .map((col) => (
                          <td
                            key={col.key}
                            style={{ padding: "10px", wordBreak: "break-word" }}
                          >
                            {String(item[col.key] || "").substring(0, 50)}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>

            {filteredData.length > 5 && (
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", mt: 1 }}
              >
                Showing 5 of {filteredData.length} records
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
