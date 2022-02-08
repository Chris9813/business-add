import { types } from "../types/types";

const initialState = {
  events: [],
};

export const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventAddNew:
      return {
        ...state,
        events: [action.payload, ...state.events],
      };

    case types.eventLoaded:
      return {
        ...state,
        events: [...action.payload],
      };

    case types.eventUpdate:
      return {
        ...state,
        events: state.events.map((e) =>
          e.personId === action.payload.personId ? action.payload : e
        ),
      };

    case types.eventDelated:
      return {
        ...state,
        events: state.events.filter((e) => e.personId !== action.payload),
      };

    default:
      return state;
  }
};
