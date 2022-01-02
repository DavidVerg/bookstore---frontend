import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { DialogContent, Fab, Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

type Props = {
  children: JSX.Element;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
};

export default function CustomizedDialogs({ children }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles({
    dialog: {
      position: "absolute",
      right: 0,
      top: 0,
    },
    fab: {
      width: "80px",
      height: "80px",
    },
  });

  const classes = useStyles();

  return (
    <Grid container justifyContent={"flex-end"}>
      <div>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={handleClickOpen}
        >
          <ShoppingCartIcon style={{ fontSize: 50 }} />
        </Fab>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          scroll="paper"
          classes={{
            paper: classes.dialog,
          }}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Carrito de Libros
          </BootstrapDialogTitle>
          <DialogContent dividers>{children}</DialogContent>
        </BootstrapDialog>
      </div>
    </Grid>
  );
}
