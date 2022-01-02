import { CssBaseline, Grid } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ApplicationBar from "./components/app-bar";
import BookForm from "./components/book/forms/createBookForm";
import DetailsForms from "./components/book/forms/detailsBookForm";
import BookMainPage from "./components/book/pages/main-page";
import BookDetails from "./components/shopping-cart/book-details";
import ShopingCartMainPage from "./components/shopping-cart/page";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Grid sx={{ m: 0, p: 2 }}>
        <ApplicationBar></ApplicationBar>
        <br />
        <Routes>
          <Route path="/books" element={<BookMainPage />}></Route>
          <Route path="/books/create" element={<BookForm />}></Route>
          <Route
            path="/books/:bookId/details"
            element={<DetailsForms />}
          ></Route>
          <Route
            path="/shopping-cart/:userId"
            element={<ShopingCartMainPage />}
          ></Route>
          <Route
            path="/shopping-cart/book-details/:bookId"
            element={<BookDetails />}
          ></Route>
        </Routes>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
