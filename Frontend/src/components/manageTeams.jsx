import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
} from "@mui/material";

const ManageTeams = ({ teams }) => {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTeam(null);
  };

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        // style={{ position: "absolute", top: 10, right: 10 }}
      >
        Manage Teams
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Manage Teams</DialogTitle>
        <DialogContent>
          {selectedTeam ? (
            <>
              <h2>{selectedTeam.name}</h2>
              <List>
                {selectedTeam.users.map((user) => (
                  <ListItem key={user.id}>
                    <ListItemText
                      primary={`${user.first_name} ${user.last_name}`}
                      secondary={`Email: ${user.email}, Gender: ${
                        user.gender
                      }, Availability: ${
                        user.available ? "Available" : "Not Available"
                      }`}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <List>
              {teams.map((team) => (
                <ListItemButton
                  key={team.id}
                  onClick={() => handleTeamClick(team)}
                >
                  <ListItemText primary={team.name} />
                </ListItemButton>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

ManageTeams.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      users: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          first_name: PropTypes.string.isRequired,
          last_name: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
          gender: PropTypes.string.isRequired,
          available: PropTypes.bool.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default ManageTeams;
