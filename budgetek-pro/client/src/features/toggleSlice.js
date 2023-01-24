import {
    TOGGLE_IANDE,
    TOGGLE_MODAL,
    TOGGLE_CALCONT_MODAL,
    TOGGLE_BU_MODAL
  } from "../utils/actions";

const initialState = {
    iande: true,
    modalValue: 'None',
    calcontVal: false,
    buVal: 'None'
  }

  export default function TogglesReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_IANDE:
            return {
              ...state,
              iande: action.iande
            };
        case TOGGLE_MODAL:
            return {
                ...state,
                modalValue: action.modalValue
            };
        case TOGGLE_CALCONT_MODAL:
            return {
              ...state,
              calcontVal: action.calcontVal
            }
        case TOGGLE_BU_MODAL:
            return {
              ...state,
              buVal: action.buVal
            }
        default:
            return state;
    }
  }