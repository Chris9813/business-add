import { types } from "../types/types";

const initialState = {
  email: "arzzKga2L@JyCNHPidGUmSZGpwXQnItz.vsct",
  name: "sed deserunt",
  phone: "Ut enim id labore",
  role: "labore qui dolore",
  join_date: "2012-08-26",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
      };
    default:
      return state;
  }
};
