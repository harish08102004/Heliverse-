import PropTypes from "prop-types";
import { TextField, Select, MenuItem, InputLabel } from "@mui/material";

const SearchAndFilter = ({
  searchTerm,
  onSearch,
  filters,
  onFilterChange,
  uniqueDomains,
}) => {
  const handleFilterChange = (event, filterType) => {
    const { value } = event.target;
    onFilterChange(filterType, value);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <TextField
        label="Search users"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        style={{ marginBottom: "20px", borderRadius: "4px" }}
        InputProps={{
          style: { borderRadius: "4px", padding: "8px" },
          classes: { notchedOutline: "no-outline" },
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          <InputLabel htmlFor="domain-filter" style={{ marginBottom: "5px" }}>
            Domain
          </InputLabel>
          <Select
            value={filters.domain}
            onChange={(e) => handleFilterChange(e, "domain")}
            id="domain-filter"
            style={{ minWidth: "150px" }}
          >
            <MenuItem value="">All domain</MenuItem>
            {uniqueDomains.map((domain) => (
              <MenuItem key={domain} value={domain}>
                {domain}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div style={{ marginRight: "20px" }}>
          <InputLabel htmlFor="gender-filter" style={{ marginBottom: "5px" }}>
            Gender
          </InputLabel>
          <Select
            value={filters.gender}
            onChange={(e) => handleFilterChange(e, "gender")}
            id="gender-filter"
            style={{ minWidth: "150px" }}
          >
            <MenuItem value="">All Gender</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </div>
        <div>
          <InputLabel
            htmlFor="availability-filter"
            style={{ marginBottom: "5px" }}
          >
            Availability
          </InputLabel>
          <Select
            value={filters.availability}
            onChange={(e) => handleFilterChange(e, "availability")}
            id="availability-filter"
            style={{ minWidth: "150px" }}
          >
            
            <MenuItem value="">All</MenuItem>
            <MenuItem value="true">Available</MenuItem>
            <MenuItem value="false">Not Available</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
};

SearchAndFilter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    domain: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    availability: PropTypes.string.isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  uniqueDomains: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchAndFilter;
