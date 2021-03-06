// Import Actions
import { TOGGLE_ADD_POST } from './AppActions';
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
      return Object.assign({}, state, {laneError: true, laneErrorBody: action.err})

    case LANE_NO_ERROR:
      return {
        laneError: false,
      };
      
    default:
      return state;
  }
};

export const getShowAddPost = state => state.app.showAddPost;

export default AppReducer;
