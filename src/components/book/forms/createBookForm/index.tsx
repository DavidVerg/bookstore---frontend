import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import bookClient from "../../api";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { MobileDatePicker } from "@mui/lab";
import { useNavigate } from "react-router-dom";

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

type FormValues = {
  bookCover: string;
  bookName: string;
  bookAuthor: string;
  bookPublicationDate: Date | null;
  bookSynopsis: string;
  bookCategory: string;
  bookPrice: number;
};

const initialValues: FormValues = {
  bookCover: "",
  bookName: "",
  bookAuthor: "",
  bookPublicationDate: null,
  bookSynopsis: "",
  bookCategory: "",
  bookPrice: 0,
};

function BookForm() {
  const navigate = useNavigate();

  const handleSubmit = async (
    formValues: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    await bookClient.createBook(formValues);

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
          <Typography variant="caption">
            Rellena el formulario para añadir un libro.
          </Typography>
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
                  name="bookCover"
                  label="Cubierta"
                  variant="standard"
                  fullWidth
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
                        onFocus={(e) => e.target.blur()}
                        fullWidth
                        error={
                          formikProps.errors.bookPublicationDate !==
                            undefined && formikProps.touched.bookPublicationDate
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
                <Grid container justifyContent={"center"}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={btnStyle}
                    disabled={!formikProps.isValid || !formikProps.dirty}
                  >
                    Agregar
                  </Button>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Paper>
    </Grid>
  );
}

export default BookForm;
