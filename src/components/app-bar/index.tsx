import { AppBar, Typography } from "@mui/material";

function ApplicationBar() {
  return (
    <AppBar position="static">
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
        textAlign={"center"}
      >
        Library App
      </Typography>
    </AppBar>
  );
}

export default ApplicationBar;
