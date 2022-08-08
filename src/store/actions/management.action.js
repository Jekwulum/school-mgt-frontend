import ActionCreator from "../../utils/helpers/actionCreator";
import * as Constants from "../constants/management.constants";
import ManagementService from "../../utils/services/management.services";
import {Loading} from "../../utils/helpers/constants";

export const getStudents = () => async dispatch => {
  try {
    dispatch(ActionCreator(Constants.FETCH_STAFF_REQUEST));
    const {data: responseData} = await ManagementService.getStudents();
    if (responseData.status !== Loading.SUCCESS) throw responseData;

    await dispatch(ActionCreator(Constants.FETCH_STAFF_SUCCESS, responseData));
  } catch (error) {
    dispatch(ActionCreator(Constants.FETCH_STAFF_FAILURE));
  }
};