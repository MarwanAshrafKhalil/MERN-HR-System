import * as requestFromServer from "./leaves.crud";
import { leaveSlice } from "./leaves.slice";

const { actions: leavesActions } = leaveSlice;

export const applyLeave = (data) => async (dispatch) => {
  dispatch(leavesActions.openLoader());
  try {
    console.log(data);
    const response = await requestFromServer.applyLeaves(data);
    const responseData = await response.json();
    console.log("resData: ", responseData);
    if (responseData.success === false) {
      dispatch(leavesActions.catchError(responseData));
    } else {
      dispatch(leavesActions.submitLeave());
    }
  } catch (error) {
    dispatch(leavesActions.catchError(error));
  } finally {
    dispatch(leavesActions.closeLoader());
  }
};

export const deleteLeave = (data) => async (dispatch) => {
  dispatch(leavesActions.openLoader());
  try {
    const response = await requestFromServer.deleteLeaves(data);
    const responseData = await response.json();
    console.log("resData: ", responseData);
    if (responseData.success === false) {
      dispatch(leavesActions.catchError(responseData));
    } else {
      dispatch(leavesActions.deleteLeave());
    }
  } catch (error) {
    dispatch(leavesActions.catchError(error));
  } finally {
    dispatch(leavesActions.closeLoader());
  }
};

export const approveLeave = (data) => async (dispatch) => {
  dispatch(leavesActions.openLoader());
  try {
    const response = await requestFromServer.approveLeaves(data);
    const responseData = await response.json();
    console.log("resData: ", responseData);
    if (responseData.success === false) {
      dispatch(leavesActions.catchError(responseData));
    } else {
      dispatch(leavesActions.approveLeave());
    }
  } catch (error) {
    dispatch(leavesActions.catchError(error));
  } finally {
    dispatch(leavesActions.closeLoader());
  }
};

export const getLeaves = (data) => async (dispatch) => {
  console.log(data);
  dispatch(leavesActions.openLoader());
  try {
    const response = await requestFromServer.getLeaves(data);
    const responseData = await response.json();
    console.log("resData: ", responseData);
    if (responseData.success === false) {
      dispatch(leavesActions.catchError(responseData.status));
    } else {
      dispatch(leavesActions.fetchLeaves(responseData));
    }
  } catch (error) {
    dispatch(leavesActions.catchError(error));
  } finally {
    dispatch(leavesActions.closeLoader());
  }
};
