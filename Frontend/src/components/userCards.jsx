import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

const UserCard = ({ user }) => {
  const userDetailsStyle = {
    border: "2px solid #000000", // Black color
    borderRadius: "12px",
    padding: "16px",
    backgroundColor: "#F1EAFF",
    fontFamily: "Montserrat, sans-serif", // Apply Montserrat font
  };

  const customStyle = {
    marginTop: "8px",
    fontFamily: "Montserrat, sans-serif", // Apply Montserrat font
  };

  return (
    <div className="hexagon-container">
      <div style={userDetailsStyle}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          style={{ display: "flex", alignItems: "center" }} // No need to duplicate fontFamily here
        >
          {user.first_name} {user.last_name}
          <span style={{ marginLeft: "auto" }}>
            <Avatar
              alt={user.first_name}
              src={user.avatar}
              className="avatar"
            />
          </span>
        </Typography>

        <Typography
          variant="body1"
          color="textSecondary"
          gutterBottom
          style={customStyle}
        >
          <b>Email</b>: {user.email}
        </Typography>
        <Typography variant="body2" color="textSecondary" style={customStyle}>
          <b>Domain</b>: {user.domain}
        </Typography>
        <Typography variant="body2" color="textSecondary" style={customStyle}>
          <b>Availability</b>: {user.available ? "Available" : "Not Available"}
        </Typography>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Typography
              variant="body2"
              color="textSecondary"
              style={customStyle}
            >
              <b>Gender</b>: {user.gender}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
  }).isRequired,
};

export default UserCard;
