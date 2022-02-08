import axios from "axios";
import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const businessStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken(`/business`);
      const body = await resp.json();
      console.log(body);
      dispatch(businessfinisloading(body.businesses));
    } catch (error) {
      console.warn(error);
    }
  };
};

const businessfinisloading = (business) => ({
  type: types.businessLoaded,
  payload: business,
});

export const eventStartAddNew = (event) => {
  console.log(event);
  return async (dispatch, getState) => {
    try {
      const resp = await fetchSinToken(`/business`, event, "POST");
      console.log(resp);
      dispatch(businessAddNew(event));
    } catch (error) {
      console.log(error);
    }
  };
};

const businessAddNew = (event) => ({
  type: types.businessAddNew,
  payload: event,
});

export const businessStartUpdate = (businessId, data) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken(`/business/${businessId}`, data, "PUT");
      const body = await resp.json();
      console.log(body);
      dispatch(businessFinisUpdate(body));
    } catch (error) {
      console.warn(error);
    }
  };
};

const businessFinisUpdate = (event) => ({
  type: types.businessUpdate,
  payload: event,
});

export const businessStartDelete = (businessId) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(`/business/${businessId}`, {}, "DELETE");
    dispatch(businessDeleted(businessId));
  };
};

const businessDeleted = (businessId) => ({
  type: types.businessDelated,
  payload: businessId,
});

/*
export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;
    try {
      const resp = await fetchConToken(`events/${id}`, {}, "DELETE");
      const body = await resp.json();
      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventDeleted = () => ({
  type: types.eventDelated,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("events");
      const body = await resp.json();
      const events = prepareEvents(body.eventos);
      dispatch(eventLoadaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoadaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});
*/
