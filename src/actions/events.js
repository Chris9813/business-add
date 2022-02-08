import axios from "axios";
import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const eventStartLoading = (businessId) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken(`/business/${businessId}/persons`);
      const body = await resp.json();
      console.log(body.persons);
      dispatch(eventfinisloading(body.persons));
    } catch (error) {
      console.warn(error);
    }
  };
};

const eventfinisloading = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventStartAddNew = (event, businessId) => {
  console.log("dfghj");
  return async (dispatch, getState) => {
    try {
      const resp = await fetchSinToken(
        `/business/${businessId}/persons`,
        event,
        "POST"
      );
      dispatch(eventAddNew(event));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventStartUpdate = (businessId, personId, data) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken(
        `/business/${businessId}/persons/${personId}`,
        data,
        "PUT"
      );
      const body = await resp.json();
      console.log(body);
      dispatch(eventFinisUpdate(body));
    } catch (error) {
      console.warn(error);
    }
  };
};

const eventFinisUpdate = (event) => ({
  type: types.eventUpdate,
  payload: event,
});

export const eventStartDelete = (businessId, personId) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      `/business/${businessId}/persons/${personId}`,
      {},
      "DELETE"
    );
    dispatch(eventDeleted(personId));
  };
};

const eventDeleted = (personId) => ({
  type: types.eventDelated,
  payload: personId,
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
