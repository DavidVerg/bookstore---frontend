import {
  CircularProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Book } from "../types";
import usePromise from "../../../shared/use-promise";
import bookClient from "../api";

function bookToRow(book: Book) {
  return (
    <TableRow key={book.bookId}>
      <TableCell>
        <Link component={RouterLink} to={`${book.bookId}/details`}>
          {book.bookId}
        </Link>
      </TableCell>
      <TableCell>{book.bookName}</TableCell>
      <TableCell>{book.bookAuthor}</TableCell>
      <TableCell>{book.bookCategory}</TableCell>
      <TableCell>{book.bookPrice}</TableCell>
    </TableRow>
  );
}

function BookTable() {
  const { isLoading, error, data } = usePromise(() => bookClient.getAll());

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <h1>Hubo un error a la hora de consultar los datos.</h1>;
  }

  if (data) {
    const book = data.map((book) => bookToRow(book));
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Genero</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{book}</TableBody>
        </Table>
      </TableContainer>
    );
  }
  return null;
}

export default BookTable;
