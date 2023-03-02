import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: "50px",
    
  },
  card: {
    display: 'flex', // This sets the display property of the card to flex, which enables flexbox layout for the card's child elements.
    flexDirection: 'column', //This sets the main axis of the flexbox layout to be vertical, meaning that the child elements of the card will be stacked on top of each other in a column.
    justifyContent: 'center', //This centers the child elements of the card along the main axis (which is set to be vertical due to the flexDirection property)
    alignItems: 'center', //This centers the child elements of the card along the cross axis (which is horizontal in this case, since the main axis is vertical).
    padding: '20px', //This adds 20 pixels of padding to all sides of the card, creating some space between the card's contents and its edges.
    flexGrow: 1, //This allows the card to grow and fill any available space within its parent container, which can be useful for creating responsive layouts.
  },
}));


const GridDisplay = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://express-t4.onrender.com/api/users")
      .then((response) => {
        const data = response.data;
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/profile/${id}`);
  };

  const filteredUsers = users.filter((user) => {
    const name = user.name.toLowerCase();
    const search = searchTerm.toLowerCase();
    const [firstName, lastName] = name.split(" ");
    return (
      firstName.includes(search) ||
      (lastName && lastName.includes(search)) //first checks whether a lastName exists for the current user (since lastName could be null or undefined in some cases). If it does, then it checks whether the search term is included in the lastName. If it is, this part of the expression also evaluates to true.
    );
  });

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Grid container spacing={2}>
        {filteredUsers.map((user) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={user._id}
            className={classes.gridContainer}
          >
            <Card
              className={classes.card}
              onClick={() => handleCardClick(user._id)}
            >
              <CardMedia
                component="img"
                height="194"
                image={user.picture}
                alt={user.name}
                style={{ objectFit: "cover" }}
              />
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="subtitle1">{user.email}</Typography>
              <Typography variant="body2">{user.address}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default GridDisplay;
