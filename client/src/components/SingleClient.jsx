import React from "react";
import {useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function SingleClient({ client }) {
  const navigate = useNavigate();

  function viewClientHandler(){
      const clientId =client.user_id ;
      navigate(`/clients/${clientId}`);
      }
  return (
    <div>
      <ListItem>
        <ListItemIcon>
        <Tooltip title="צפיה בפרטי לקוח">
      <IconButton>
        <VisibilityIcon onClick={viewClientHandler}/>
      </IconButton>
    </Tooltip>
        </ListItemIcon>
        <ListItemText primary={client.userName} secondary={client.user_id} />
        {console.log(client)}
      </ListItem>
      ,
    </div>
  );
}

export default SingleClient;
