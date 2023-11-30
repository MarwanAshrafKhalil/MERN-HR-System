import { employeeSlice } from "./employee.slice";
import * as requestFromServer from "./employee.crud";

const { actions: employeeActions } = employeeSlice;

export const signinEmployee = (data) => async (dispatch) => {
  dispatch(employeeActions.openLoader());
  try {
    const response = await requestFromServer.getEmployee(data);
    const responseData = await response.json();
    if (responseData.success === false) {
      dispatch(employeeActions.catchError(responseData));
    } else dispatch(employeeActions.fetchEmployee(responseData));
  } catch (error) {
    dispatch(employeeActions.catchError(error));
  } finally {
    dispatch(employeeActions.closeLoader());
  }
};

export const updateEmployee = (formData) => async (dispatch) => {
  // console.log("DATA: ", data);
  console.log("formData-act: ", formData);

  dispatch(employeeActions.openLoader());
  try {
    const response = await requestFromServer.updatedEmployee(formData);

    // console.log("response: ", response);

    if (!response.ok) {
      throw new Error(`Failed to update employee: ${response.statusText}`);
    }

    const responseData = await response.json();

    if (responseData.success === false) {
      dispatch(employeeActions.catchError(responseData));
      return false;
    } else {
      dispatch(employeeActions.fetchEmployee(responseData));
      return true;
    }
  } catch (error) {
    dispatch(employeeActions.catchError(error));
  } finally {
    dispatch(employeeActions.closeLoader());
  }
};

export const deleteEmployee = (data) => async (dispatch) => {
  // console.log("DATA: ", data);
  dispatch(employeeActions.openLoader());
  try {
    const res = await fetch("/api/employee/delete/${}", {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success === false) {
      return;
    }
    dispatch(deleteEmployee());
  } catch (error) {
    dispatch(employeeActions.catchError(error));
  } finally {
    dispatch(employeeActions.closeLoader());
  }
};

// export const signoutEmployee = (data) => async (dispatch) => {
//   // console.log("DATA: ", data);
//   dispatch(employeeActions.openLoader());
//   try {
//     const res = await fetch("/api/employee/delete/${}", {
//       method: "DELETE",
//     });
//     const data = await res.json();
//     if (data.success === false) {
//       return;
//     }
//     dispatch(deleteEmployee());
//   } catch (error) {
//     dispatch(employeeActions.catchError(error));
//   } finally {
//     dispatch(employeeActions.closeLoader());
//   }
// };
