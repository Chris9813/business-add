import { types } from "../types/types";

const initialState = {
  business: [],
};

export const businessScreenReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.businessAddNew:
      return {
        ...state,
        business: [action.payload, ...state.business],
      };

    case types.businessLoaded:
      return {
        ...state,
        business: [...action.payload],
      };

    case types.businessUpdate:
      return {
        ...state,
        business: state.business.map((e) =>
          e.businessId === action.payload.businessId ? action.payload : e
        ),
      };

    case types.businessDelated:
      return {
        ...state,
        business: state.business.filter((e) => e.businessId !== action.payload),
      };

    case types.setActive:
      return {
        ...state,
        businessActive: action.payload,
      };

    default:
      return state;
  }
};
