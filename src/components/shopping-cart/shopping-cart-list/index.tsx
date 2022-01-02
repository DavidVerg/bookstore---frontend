import {
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import usePromise from "../../../shared/use-promise";
import shoppingCartClient from "../api";
import { useParams } from "react-router-dom";
import { BookCart } from "../types/bookcart";
import ShoppingCartElement from "../shopping-cart-element";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

function BookCartToList(bookCart: BookCart, userId: string) {
  return (
    <Grid item key={bookCart.bookId}>
      <ShoppingCartElement
        bookId={bookCart.bookId}
        quantity={bookCart.quantity}
      />
      <Grid container justifyContent="center">
        <Grid item>
          <IconButton onClick={() => removeBook(bookCart, userId)}>
            <RemoveIcon></RemoveIcon>
          </IconButton>
        </Grid>
        <Grid item>
          <TextField
            disabled
            id="outlined-disabled"
            label="Cantidad"
            size="small"
            defaultValue={bookCart.quantity}
          />
        </Grid>
        <Grid item>
          <IconButton onClick={() => addBook(bookCart, userId)}>
            <AddIcon></AddIcon>
          </IconButton>
        </Grid>
      </Grid>
      <br />
      <Divider variant="middle" />
    </Grid>
  );
}

type UpdateRquest = {
  bookId: string;
  quantity: number;
};

async function addBook(bookCart: BookCart, userId: string) {
  const update: UpdateRquest = {
    bookId: bookCart.bookId,
    quantity: bookCart.quantity + 1,
  };

  await shoppingCartClient.updateShoppingCart(userId, update);
}

async function removeBook(bookCart: BookCart, userId: string) {
  const update: UpdateRquest = {
    bookId: bookCart.bookId,
    quantity: bookCart.quantity - 1,
  };

  await shoppingCartClient.updateShoppingCart(userId, update);
}

function ShoppingCartList() {
  const { userId } = useParams();

  const { isLoading, error, data } = usePromise(() =>
    shoppingCartClient.getById(userId!)
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <h1>Hubo un error a la hora de consultar los datos.</h1>;
  }

  if (data) {
    const bookCart = data.bookCart.map((bookCart) =>
      BookCartToList(bookCart, userId!)
    );
    return (
      <>
        {bookCart}
        <Grid container justifyContent="space-between" direction="row">
          <Grid
            item
            container
            direction="column"
            alignContent="flex-start"
            xs={10}
          >
            <Grid item>Creacion {data.creationDate}</Grid>
            <Grid item>Ultima modificacion {data.lastUpdateDate}</Grid>
          </Grid>
          <Grid item container alignContent="flex-end" xs={2}>
            <Grid item>Total $ {data.totalPrice.toFixed(2)}</Grid>
          </Grid>
        </Grid>
      </>
    );
  }

  return null;
}

export default ShoppingCartList;
