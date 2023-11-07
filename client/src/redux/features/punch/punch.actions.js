import * as requestFromServer from "./punch.crud";
import { punchSlice } from "./punch.slice";

const { actions: punchActions } = punchSlice;

export const fetchPunchEmp = (data) => async (dispatch) => {
  dispatch(punchActions.openLoader());
  try {
    const response = await requestFromServer.getPunch({ data });
    const responseData = await response.json();
    if (responseData.success === false) {
      dispatch(punchActions.catchError(responseData));
    } else {
      if (
        Object.keys(responseData).includes("punchInTime") &&
        Object.keys(responseData).includes("punchOutTime")
      ) {
        // console.log("exception case: ", responseData);
        dispatch(punchActions.fetchPunches(responseData));
      } else if (Object.keys(responseData).includes("punchInTime")) {
        dispatch(punchActions.fetchPunchIn(responseData));
      }
    }
  } catch (error) {
    dispatch(punchActions.catchError(error));
  } finally {
    dispatch(punchActions.closeLoader());
  }
};

export const punchInEmp = (data) => async (dispatch) => {
  dispatch(punchActions.openLoader());
  try {
    const response = await requestFromServer.punchInReq(data);
    const responseData = await response.json();
    if (responseData.success === false) {
      dispatch(punchActions.catchError(responseData));
    } else {
      dispatch(punchActions.setPunchIn(responseData));
    }
  } catch (error) {
    dispatch(punchActions.catchError(error));
  } finally {
    dispatch(punchActions.closeLoader());
  }
};

export const punchOutEmp = (data) => async (dispatch) => {
  dispatch(punchActions.openLoader());
  try {
    const response = await requestFromServer.punchOutReq(data);
    const responseData = await response.json();
    if (responseData.success === false) {
      dispatch(punchActions.catchError(responseData));
    } else {
      dispatch(punchActions.setPunchOut(responseData));
    }
  } catch (error) {
    dispatch(punchActions.catchError(error));
  } finally {
    dispatch(punchActions.closeLoader());
  }
};
