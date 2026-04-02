import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

export function AdvancedFilterPanel({
  filters,
  onFilterChange,
  onClearFilters,
  filterFields = [],
}) {
  const [showFilters, setShowFilters] = useState(false);

  const handleFieldChange = (fieldName, value) => {
    onFilterChange({ ...filters, [fieldName]: value });
  };

  const handleClearField = (fieldName) => {
    const newFilters = { ...filters };
    delete newFilters[fieldName];
    onFilterChange(newFilters);
  };

  const handleClearAll = () => {
    onClearFilters();
  };

  const activeFilterCount = Object.keys(filters).filter(
    (k) => filters[k],
  ).length;

  return (
    <Box sx={{ mb: 3 }}>
      <Card sx={{ p: 2 }}>
        <Button
          startIcon={<SearchIcon />}
          onClick={() => setShowFilters(!showFilters)}
          variant="outlined"
          sx={{ mb: 2 }}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
          {activeFilterCount > 0 && (
            <Chip
              label={activeFilterCount}
              size="small"
              sx={{ ml: 1 }}
              color="primary"
            />
          )}
        </Button>

        {showFilters && (
          <>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {filterFields.map((field) => (
                <Grid item xs={12} sm={6} md={4} key={field.name}>
                  <TextField
                    fullWidth
                    size="small"
                    label={field.label}
                    type={field.type || "text"}
                    value={filters[field.name] || ""}
                    onChange={(e) =>
                      handleFieldChange(field.name, e.target.value)
                    }
                    select={field.options ? true : false}
                    SelectProps={field.options ? { native: true } : undefined}
                    InputProps={
                      !field.options
                        ? {
                            endAdornment: filters[field.name] && (
                              <InputAdornment position="end">
                                <IconButton
                                  size="small"
                                  onClick={() => handleClearField(field.name)}
                                  edge="end"
                                >
                                  <ClearIcon fontSize="small" />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }
                        : undefined
                    }
                  >
                    {field.options && (
                      <>
                        <option value="">All</option>
                        {field.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </>
                    )}
                  </TextField>
                </Grid>
              ))}
            </Grid>

            {activeFilterCount > 0 && (
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={handleClearAll}
                >
                  Clear All Filters
                </Button>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {Object.entries(filters).map(
                    ([key, value]) =>
                      value && (
                        <Chip
                          key={key}
                          label={`${key}: ${value}`}
                          size="small"
                          onDelete={() => handleClearField(key)}
                        />
                      ),
                  )}
                </Box>
              </Stack>
            )}
          </>
        )}
      </Card>
    </Box>
  );
}
