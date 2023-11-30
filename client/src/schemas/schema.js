import * as yup from "yup";

export const basicSchema = yup.object().shape({
  type: yup.string().required("Required"),
  fromDate: yup.date().required("Required"),
  toDate: yup.date().required("Required"),
  duration: yup.string().required("Required"),
  comment: yup.string().required("Required"),
});
