import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import PropTypes from "prop-types";

const CreateTeam = ({ users, onCreate }) => {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setSelectedUsers([]);
    setTeamName("");
    setError("");
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUsers([]);
    setTeamName("");
    setError("");
  };

  const handleUserSelect = (userId) => {
    const index = selectedUsers.indexOf(userId);
    if (index === -1) {
      setSelectedUsers((prevUsers) => [...prevUsers, userId]);
    } else {
      setSelectedUsers((prevUsers) => prevUsers.filter((id) => id !== userId));
    }
  };

  const handleCreateTeam = () => {
    if (!teamName) {
      setError("Please enter a team name");
      return;
    }
    const newTeam = {
      id: Math.floor(Math.random() * 1000),
      name: teamName,
      users: selectedUsers.map((userId) =>
        users.find((user) => user.id === userId)
      ),
    };
    onCreate(newTeam);
    handleClose();
  };

  return (
    <div >
      <Button variant="contained" onClick={handleOpen}>
        Create Team
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Team</DialogTitle>
        <DialogContent>
          <TextField
            label="Team Name"
            variant="outlined"
            fullWidth
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Typography variant="h6">Select Team Members:</Typography>
          {users.map((user) => (
            <FormControlLabel
              key={user.id}
              control={
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleUserSelect(user.id)}
                />
              }
              label={`${user.first_name} ${user.last_name}`}
            />
          ))}
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleCreateTeam}
            disabled={selectedUsers.length === 0}
            variant="contained"
          >
            Create Team
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CreateTeam.propTypes = {
  users: PropTypes.array.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default CreateTeam;
