import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { BookCart } from "../types/bookcart";
import { CircularProgress } from "@mui/material";
import bookClient from "../../book/api";
import usePromise from "../../../shared/use-promise";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ShoppingCartElement(bookCart: BookCart) {
  const { isLoading, error, data } = usePromise(() =>
    bookClient.getById(bookCart.bookId)
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <h1>Hubo un error a la hora de consultar los datos.</h1>;
  }

  if (data) {
    return (
      <Paper
        elevation={0}
        sx={{ p: 1, margin: "auto", maxWidth: 500, flexGrow: 1 }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={data.bookCover} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container alignContent="center">
            <Grid item xs container direction="column" spacing={2}>
              <Grid
                item
                xs
                container
                direction="column"
                alignContent="flex-start"
              >
                <Typography gutterBottom variant="h5" component="div">
                  {data.bookName}
                </Typography>
                <Typography variant="subtitle1" component="div">
                  $ {data.bookPrice.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  return null;
}
