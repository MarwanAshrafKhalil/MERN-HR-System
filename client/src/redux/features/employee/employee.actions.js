import { employeeSlice } from "./employee.slice";
import * as requestFromServer from "./employee.crud";

const { actions: employeeActions } = employeeSlice;

export const signinEmployee = (data) => async (dispatch) => {
  console.log("DATA: ", data);
  dispatch(employeeActions.openLoader());
  try {
    const response = await requestFromServer.getEmployee(data);
    const responseData = await response.json();
    console.log("response: ", responseData);
    if (responseData.success === false) {
      dispatch(employeeActions.catchError(responseData));
    } else dispatch(employeeActions.fetchEmployee(responseData));
  } catch (error) {
    dispatch(employeeActions.catchError(error));
  } finally {
    dispatch(employeeActions.closeLoader());
  }
};
