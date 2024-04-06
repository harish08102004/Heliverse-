import { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  
} from "@mui/material";
// import { FilterList } from "@mui/icons-material";
import userData from "../users.json";
import UserCard from "./userCards";

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    domain: "",
    gender: "",
    availability: "",
  });

  const usersPerPage = 20;
  const maxPageButtons = 5; // Maximum number of pagination buttons to display

  useEffect(() => {
    const fetchUserData = () => {
      try {
        setTimeout(() => {
          setUsers(userData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page to 1 when searching
  };

  const handleFilterChange = (event, filterType) => {
    const { value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const applyFilters = (user) => {
    return (
      (!filters.domain || user.domain === filters.domain) &&
      (!filters.gender || user.gender === filters.gender) &&
      (!filters.availability ||
        user.available === (filters.availability === "true"))
    );
  };

  const filteredUsers = users
    .filter((user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(applyFilters);

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Calculate index of the last user on the current page
  const lastIndex = currentPage * usersPerPage;

  // Calculate index of the first user on the current page
  const firstIndex = lastIndex - usersPerPage;

  // Get users for the current page
  const currentUsers = filteredUsers.slice(firstIndex, lastIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    const middlePage = Math.ceil(maxPageButtons / 2);
    let startPage = currentPage - middlePage + 1;
    let endPage = currentPage + middlePage - 1;

    if (startPage < 1) {
      startPage = 1;
      endPage = maxPageButtons;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <Typography variant="h5" color="error">
          Error: {error}
        </Typography>
      </div>
    );
  }

  // Extract unique domains from user data
  const uniqueDomains = Array.from(new Set(users.map((user) => user.domain)));

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h1" align="center" gutterBottom fontSize={"64px"}>
        Heliverse
      </Typography>
      <TextField
        label="Search users"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px", borderRadius: "4px" }}
        InputProps={{
          style: { borderRadius: "4px", padding: "8px" },
          classes: { notchedOutline: "no-outline" },
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-arround",
          marginBottom: "20px",
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
            <MenuItem value="">All Domains</MenuItem>
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
            <MenuItem value="">All Genders</MenuItem>
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
            <MenuItem value="">All Availability</MenuItem>
            <MenuItem value="true">Available</MenuItem>
            <MenuItem value="false">Not Available</MenuItem>
          </Select>
        </div>
        {/* <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton aria-label="filter" disabled>
            <FilterList />
          </IconButton>
        </div> */}
      </div>

      <Grid container spacing={4} justifyContent="center">
        {currentUsers.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            style={{
              padding: "8px 16px",
              margin: "0 4px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              backgroundColor:
                currentPage === pageNumber ? "#4CAF50" : "#E0E0E0",
              color: currentPage === pageNumber ? "#FFFFFF" : "#000000",
            }}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
