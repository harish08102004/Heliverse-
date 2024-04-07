import { useState, useEffect } from "react";
import { Grid, CircularProgress, Typography, Box } from "@mui/material";
import userData from "../users.json";
import UserCard from "./userCards";
import CreateTeam from "./createTeam";
import ManageTeams from "./manageTeams";
import SearchAndFilter from "./tools";

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    domain: "",
    gender: "",
    availability: "",
  });
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 20;
  const maxPageButtons = 5;

  useEffect(() => {
    const fetchUserData = () => {
      try {
        setUsers(userData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleCreateTeam = (newTeam) => {
    setTeams((prevTeams) => [...prevTeams, newTeam]);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to first page when changing filters
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

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const firstIndex = (currentPage - 1) * usersPerPage;
  const lastIndex = currentPage * usersPerPage;
  const currentUsers = filteredUsers.slice(firstIndex, lastIndex);

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

  const uniqueDomains = Array.from(new Set(users.map((user) => user.domain)));

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h1" align="center" gutterBottom fontSize={"64px"}>
        Heliverse
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="20px"
      >
        <CreateTeam users={users} onCreate={handleCreateTeam} />
        <ManageTeams teams={teams} />

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearch={handleSearch}
          filters={filters}
          onFilterChange={handleFilterChange}
          uniqueDomains={uniqueDomains}
        />
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {currentUsers.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {Array.from(
          { length: Math.min(maxPageButtons, totalPages) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              style={{
                padding: "8px 16px",
                margin: "0 4px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor: currentPage === i + 1 ? "#4CAF50" : "#E0E0E0",
                color: currentPage === i + 1 ? "#FFFFFF" : "#000000",
              }}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default UserList;
