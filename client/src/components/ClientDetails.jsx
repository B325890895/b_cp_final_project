import React from 'react'
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./components_css/ClientDetails.css"

function ClientDetails ({client}) {
  return (
    <Container component="main" maxWidth="lg" dir="rtl">
    <CssBaseline />
    <Box className="form-container">
      <Typography component="h1" variant="h4">
        ת.ז.: {client.user_id}
      </Typography>
      <Typography component="h1" variant="h4">
        שם:{client.userName}
      </Typography>
      <Box dir="rtl" noValidate className="form-content">
        <Box className="form-fields">
          <Box className="left-side">
            <Box id="profile">
              <Typography component="h1" variant="h6">
                כתובת מייל: {client.email}
              </Typography>
              <Typography component="h1" variant="h6">
                קופת חולים:{client.hmo}
              </Typography>
              <Typography component="h1" variant="h6">
                תאריך לידה: {client.birthDate}
              </Typography>
            </Box>
          </Box>

          <Box className="right-side">
            <Box id="father">
              <Typography component="h1" variant="h5">
                פרטי אב
              </Typography>
              <Typography component="h1" variant="h6">
                שם:{client.father.name}
              </Typography>
              <Typography component="h1" variant="h6">
                טלפון:{client.father.phoneNumber}
              </Typography>
            </Box>
            <Box id="mother">
              <Typography component="h1" variant="h5">
                פרטי אם
              </Typography>
              <Typography component="h1" variant="h6">
                שם: {client.mother.name}
              </Typography>
              <Typography component="h1" variant="h6">
                טלפון:{client.mother.phoneNumber}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  </Container>

  )
}

export default ClientDetails
