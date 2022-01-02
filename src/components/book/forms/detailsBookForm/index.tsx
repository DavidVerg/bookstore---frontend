import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import usePromise from "../../../../shared/use-promise";
import bookClient from "../../api";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import AlertDialog from "../../delete-dialog";
import { useNavigate } from "react-router-dom";

type FormValues = {
  bookId: string;
  bookCover: string;
  bookName: string;
  bookAuthor: string;
  bookPublicationDate: Date | null;
  bookSynopsis: string;
  bookCategory: string;
  bookPrice: number;
};

const validationSchema = yup.object({
  bookCover: yup
    .string()
    .required("La dirección de la cubierta del libro es requerida."),
  bookName: yup.string().required("El nombre del libro es requerido."),
  bookAuthor: yup.string().required("El autor del libro es requerido."),
  bookPublicationDate: yup
    .date()
    .required("La fecha de publicacion del libro es requerida."),
  bookSynopsis: yup.string().required("La sinopsis del libro es requerida."),
  bookCategory: yup.string().required("La categoria del libro es requerida."),
  bookPrice: yup
    .number()
    .required("El precio del libro es requerido.")
    .min(1, "El precio del libro no puede ser 0 o menor que 0."),
});

function DetailsForms() {
  const navigate = useNavigate();
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
    const initialValues: FormValues = {
      bookId: data.bookId,
      bookCover: data.bookCover,
      bookName: data.bookName,
      bookAuthor: data.bookAuthor,
      bookPublicationDate: new Date(
        data.bookPublicationDate.valueOf().replace(/-/g, "/").replace(/T.+/, "")
      ),
      bookSynopsis: data.bookSynopsis,
      bookCategory: data.bookCategory,
      bookPrice: data.bookPrice,
    };

    const handleSubmit = async (
      formValues: FormValues,
      helpers: FormikHelpers<FormValues>
    ) => {
      await bookClient.updateBook(bookId!, formValues);

      helpers.resetForm({
        values: initialValues,
      });
      navigate("/books");
    };

    const paperStyle = { padding: "0 15px 40px 15px", width: 500 };
    const btnStyle = { marginTop: 10 };

    return (
      <Grid container justifyContent={"center"}>
        <Paper elevation={0} style={paperStyle}>
          <Grid container justifyContent={"center"}>
            <Typography variant="caption">Detalles del libro.</Typography>
          </Grid>
          <Formik<FormValues>
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(formikProps) => {
              return (
                <form onSubmit={formikProps.handleSubmit}>
                  <TextField
                    name="bookId"
                    label="Identificador"
                    variant="standard"
                    fullWidth
                    disabled
                    value={formikProps.values.bookId}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={
                      formikProps.errors.bookCover !== undefined &&
                      formikProps.touched.bookCover
                    }
                    helperText={formikProps.errors.bookCover || ""}
                  />
                  <TextField
                    name="bookCover"
                    label="Cubierta"
                    variant="standard"
                    fullWidth
                    multiline
                    value={formikProps.values.bookCover}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={
                      formikProps.errors.bookCover !== undefined &&
                      formikProps.touched.bookCover
                    }
                    helperText={formikProps.errors.bookCover || ""}
                  />
                  <TextField
                    name="bookName"
                    label="Nombre"
                    variant="standard"
                    fullWidth
                    value={formikProps.values.bookName}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={
                      formikProps.errors.bookName !== undefined &&
                      formikProps.touched.bookName
                    }
                    helperText={formikProps.errors.bookName || ""}
                  />
                  <TextField
                    name="bookAuthor"
                    label="Autor"
                    variant="standard"
                    fullWidth
                    value={formikProps.values.bookAuthor}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={
                      formikProps.errors.bookAuthor !== undefined &&
                      formikProps.touched.bookAuthor
                    }
                    helperText={formikProps.errors.bookAuthor || ""}
                  />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      orientation="landscape"
                      label="Fecha de publicación"
                      clearable={true}
                      value={formikProps.values.bookPublicationDate}
                      onChange={(newValue) => {
                        formikProps.setFieldValue(
                          "bookPublicationDate",
                          newValue
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          onBlur={formikProps.handleBlur}
                          name="bookPublicationDate"
                          variant="standard"
                          fullWidth
                          error={
                            formikProps.errors.bookPublicationDate !==
                              undefined &&
                            formikProps.touched.bookPublicationDate
                          }
                          helperText={
                            formikProps.errors.bookPublicationDate || ""
                          }
                        />
                      )}
                      mask="____-__-__"
                      inputFormat="yyyy-MM-dd"
                    />
                  </LocalizationProvider>
                  <TextField
                    name="bookCategory"
                    label="Categoria"
                    variant="standard"
                    fullWidth
                    value={formikProps.values.bookCategory}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={
                      formikProps.errors.bookCategory !== undefined &&
                      formikProps.touched.bookCategory
                    }
                    helperText={formikProps.errors.bookCategory || ""}
                  />
                  <TextField
                    name="bookPrice"
                    label="Precio"
                    variant="standard"
                    fullWidth
                    value={formikProps.values.bookPrice}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={
                      formikProps.errors.bookPrice !== undefined &&
                      formikProps.touched.bookPrice
                    }
                    helperText={formikProps.errors.bookPrice || ""}
                  />
                  <TextField
                    name="bookSynopsis"
                    label="Sinopsis"
                    variant="standard"
                    fullWidth
                    multiline
                    maxRows={5}
                    value={formikProps.values.bookSynopsis}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={
                      formikProps.errors.bookPrice !== undefined &&
                      formikProps.touched.bookPrice
                    }
                    helperText={formikProps.errors.bookSynopsis || ""}
                  />
                  <Grid container spacing={2} justifyContent={"center"}>
                    <Grid item>
                      <Button
                        variant="contained"
                        type="submit"
                        style={btnStyle}
                        disabled={!formikProps.isValid || !formikProps.dirty}
                      >
                        Editar
                      </Button>
                    </Grid>
                    <Grid item>
                      <AlertDialog></AlertDialog>
                    </Grid>
                  </Grid>
                </form>
              );
            }}
          </Formik>
        </Paper>
      </Grid>
    );
  }

  return null;
}

export default DetailsForms;
