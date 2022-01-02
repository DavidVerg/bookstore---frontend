import {
  ButtonBase,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import bookClient from "../../book/api";
import { useParams } from "react-router-dom";
import usePromise from "../../../shared/use-promise";
import { styled } from "@mui/material/styles";
import { DataUsage } from "@mui/icons-material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function BookDetails() {
  const { bookId } = useParams();
  const { isLoading, error, data } = usePromise(() =>
    bookClient.getById(bookId!)
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <h1>Hubo un error a la hora de consultar los datos.</h1>;
  }

  if (data) {
    const paperStyle = { padding: "0 15px 40px 15px", width: 500 };

    return (
      <Grid container justifyContent={"center"}>
        <Paper elevation={0} style={paperStyle}>
          <Grid item container direction="column" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {data.bookId}
            </Typography>
            <Grid item>
              <ButtonBase sx={{ width: 256, height: 256 }}>
                <Img alt="complex" src={data.bookCover} />
              </ButtonBase>
            </Grid>
            <Typography variant="h5">{data.bookName}</Typography>
            <Typography variant="h6">{data.bookAuthor}</Typography>
            <Typography variant="body2">{data.bookPublicationDate}</Typography>
            <Typography variant="body2">{data.bookCategory}</Typography>
            <Typography variant="body2">{data.bookSynopsis}</Typography>
            <Typography variant="subtitle1">
              $ {data.bookPrice.toFixed(2)}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  }

  return null;
}

export default BookDetails;
