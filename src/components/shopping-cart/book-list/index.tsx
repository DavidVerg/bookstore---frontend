import { CircularProgress, Grid } from "@mui/material";
import usePromise from "../../../shared/use-promise";
import bookClient from "../../book/api";
import { Book } from "../../book/types";
import BookElement from "../book-element";

function bookToList(book: Book) {
  return (
    <Grid item key={book.bookId}>
      <BookElement
        bookAuthor={book.bookAuthor}
        bookCategory={book.bookCategory}
        bookCover={book.bookCover}
        bookId={book.bookId}
        bookName={book.bookName}
        bookPrice={book.bookPrice}
        bookPublicationDate={book.bookPublicationDate}
        bookSynopsis={book.bookSynopsis}
      />
    </Grid>
  );
}

function BookList() {
  const { isLoading, error, data } = usePromise(() => bookClient.getAll());

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <h1>Hubo un error a la hora de consultar los datos.</h1>;
  }

  if (data) {
    const book = data.map((book) => bookToList(book));
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {book}
      </Grid>
    );
  }
  return null;
}

export default BookList;
