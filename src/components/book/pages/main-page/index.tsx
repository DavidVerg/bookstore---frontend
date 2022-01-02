import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BookTable from "../../table";
import { Grid } from "@mui/material";

type LinkProps = {
  to: string;
};

const LinkBehavior = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link ref={ref} {...props} role={undefined} />
);

function BookMainPage() {
  return (
    <>
      <Grid container justifyContent={"space-between"}>
        <Grid item>
          <Typography variant="h4" component="div" gutterBottom>
            Lista de libros
          </Typography>
        </Grid>
        <Grid item>
          <Button component={LinkBehavior} to="create" variant="contained">
            Crear Libro
          </Button>
        </Grid>

        <BookTable></BookTable>
      </Grid>
    </>
  );
}

export default BookMainPage;
