import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  infoContainer: {
    marginLeft: theme.spacing(4),
  },
}));

const ProfilePage = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`https://express-t4.onrender.com/api/users/${id}`)
      .then((response) => {
        setUser(response.data);
        console.log(response);
      });
  }, [id]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {user && (
        <div>
          {" "}
          <Grid container spacing={4}>
            <Grid item>
              <Avatar
                alt={user.name}
                src={user.picture}
                className={classes.avatar}
              />
            </Grid>
            <Grid item className={classes.infoContainer}>
              <Typography variant="h4" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Age: {user.age}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Gender: {user.gender}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Email: {user.email}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Phone: {user.phone}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Address: {user.address}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Company: {user.company}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Balance: {user.balance}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" gutterBottom>
            About
          </Typography>
          <Typography variant="body1" gutterBottom>
            {user.about}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Friends
          </Typography>
          <Grid container spacing={2}>
            {user.friends.map((friend) => (
              <Grid item key={friend.id}>
                <Typography variant="subtitle1">{friend.name}</Typography>
              </Grid>
            ))}
          </Grid>{" "}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
