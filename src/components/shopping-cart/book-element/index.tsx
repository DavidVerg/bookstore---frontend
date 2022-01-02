import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Book } from "../../book/types";
import { IconButton, Link } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import shoppingCartClient from "../../shopping-cart/api";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

type UpdateRquest = {
  bookId: string;
  quantity: number;
};

async function addBook(book: Book, userId: string) {
  const update: UpdateRquest = {
    bookId: book.bookId,
    quantity: 1,
  };

  await shoppingCartClient.createShoppingCartElement(userId, update);
}

export default function BookElement(book: Book) {
  const { userId } = useParams();

  return (
    <Paper sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <Link
            component={RouterLink}
            to={`/shopping-cart/book-details/${book.bookId}`}
          >
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={book.bookCover} />
            </ButtonBase>
          </Link>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {book.bookName}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {book.bookAuthor}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                id: {book.bookId}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justifyItems="space-between"
              alignItems="flex-end"
            >
              <Grid item>
                <Typography variant="subtitle1" component="div">
                  $ {book.bookPrice.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={() => addBook(book, userId!)}>
                  <AddShoppingCartIcon></AddShoppingCartIcon>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
