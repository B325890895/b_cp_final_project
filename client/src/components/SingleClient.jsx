import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import VisibilityIcon from "@mui/icons-material/Visibility";

function SingleClient({ client }) {
console.log("SingleClient");
  return (
    <div>
      <ListItem>
        <ListItemIcon>
          <VisibilityIcon />
        </ListItemIcon>
        <ListItemText primary={client.userName} secondary={client.user_id} />
        {console.log(client)}
      </ListItem>
      ,
    </div>
  );
}

export default SingleClient;
