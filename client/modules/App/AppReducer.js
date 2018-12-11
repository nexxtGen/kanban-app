// Import Actions
import { TOGGLE_ADD_POST } from './AppActions';

//err
import { LANE_ERROR, LANE_NO_ERROR } from '../Lane/LaneActions';

// Initial State
const initialState = {
  showAddPost: false,
  laneError: false,
  laneErrorBody: {},
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };
    case LANE_ERROR:
      /*
      return {
        ...state,
        laneError: 'true',
        laneErrorBody: action.err, 
      };  */
      return Object.assign({}, state, {laneError: true, laneErrorBody: action.err})
    case LANE_NO_ERROR:
      return {
        laneError: false,
      };
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;
//export const laneError = state => state.app.laneError;
// Export Reducer
export default AppReducer;
