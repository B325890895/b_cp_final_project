import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import SingleClient from "../components/SingleClient";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function Clients({ userState }) {
  const navigate = useNavigate();
  const URL_API = "http://localhost:3000";
  const [jsonClientList, setJsonClientList] = useState();
  const [clientList, setClientList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [searchClientId, setSearchClientId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");
  
  useEffect(() => {
    (async () => await fetchClients())();
  }, []);

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  switch (userState) {
    case "manager":
      break;
    case "client":
      navigate("/*");
      break;
    default:
      navigate("/*");
      break;
  }

  useEffect(() => {
    if (searchTerm === "" && searchClientId === "") {
      setClientList(jsonClientList);
    } else {
      setClientList(
        jsonClientList
          .filter((client) => client.userName.startsWith(searchTerm))
          .filter((client) =>
            client.user_id.toString().startsWith(searchClientId)
          )
      );
    }
  }, [searchTerm, searchClientId]);

  const fetchClients = async () => {
    try {
      const response = await fetch(`${URL_API}/user`);
      if (!response.ok) {
        throw Error("Did not receive expected data");
      }
      const result = await response.json();
      setJsonClientList(result);
      setClientList(result);
    } catch (err) {
      console.log("there was an error");
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    function randomSort(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    function sortClients() {
      switch (sort) {
        case "serial":
          const serialSort = jsonClientList.sort((a, b) => a.user_id - b.user_id);
          setClientList([...serialSort]);
          break;
        case "alphabetical":
          const alphabeticalSort = jsonClientList.sort((a, b) =>
            a.userName.localeCompare(b.userName)
          );
          console.log(alphabeticalSort);
          setClientList([...alphabeticalSort]);
          break;
        case "random":
          setClientList(randomSort([...jsonClientList]));
          break;
      }
    }
    sortClients();
  }, [sort]);

  function clearHandler() {
    setSearchTerm("");
    setSearchClientId("");
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 2 }}>
        <Paper elevation={3} sx={{ p: 2, width: 300 }}>
          <InputLabel id="sort-by">מיון עפ"י</InputLabel>
          <Select
            fullWidth
            labelId="sort-by"
            id="sort-by"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value="serial">סריאלי</MenuItem>
            <MenuItem value="alphabetical">אלפבתי</MenuItem>
            <MenuItem value="random">רנדומלי</MenuItem>
          </Select>
          <TextField
            fullWidth
            id="search-name"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label="הכנס שם לקוח לחיפוש"
            margin="normal"
          />
          <TextField
            fullWidth
            id="search-id"
            variant="outlined"
            value={searchClientId}
            onChange={(e) => setSearchClientId(e.target.value)}
            label="הכנס ת.ז. לחיפוש"
            margin="normal"
          />
        </Paper>
      </Box>
      
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {isLoading && <Loading />}
        {fetchError && <Error message={fetchError} />}
        {!isLoading && !fetchError && (
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h6" component="div" align="center" gutterBottom>
                רשימת לקוחות
              </Typography>
              <List>
                {clientList.map((client) => (
                  <SingleClient key={client.user_id} client={client} />
                ))}
              </List>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default Clients;
