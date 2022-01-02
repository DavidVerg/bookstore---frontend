import { Grid } from "@mui/material";
import BookList from "../book-list";
import CustomizedDialogs from "../dialog";
import ShoppingCartList from "../shopping-cart-list";

function ShopingCartMainPage() {
  return (
    <>
      <Grid container justifyContent="flex-end">
        <Grid item style={{ position: "fixed" }}>
          <CustomizedDialogs>
            <ShoppingCartList></ShoppingCartList>
          </CustomizedDialogs>
        </Grid>
      </Grid>
      <BookList></BookList>
    </>
  );
}

export default ShopingCartMainPage;
