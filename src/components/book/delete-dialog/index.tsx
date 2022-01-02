import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bookClient from "../api";

export default function AlertDialog() {
  const { bookId } = useParams();

  const navigate = useNavigate();

  const handleDelete = async (bookId: string) => {
    await bookClient.deleteBook(bookId);
    navigate("/");
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const btnStyle = { marginTop: 10 };

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        style={btnStyle}
        onClick={handleClickOpen}
      >
        Eliminar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Mensaje de confirmación."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de que desea eliminar este elemento?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleDelete(bookId!);
            }}
            autoFocus
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
