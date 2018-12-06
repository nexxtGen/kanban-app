// Import Actions
import { CREATE_LANE, UPDATE_LANE, DELETE_LANE, EDIT_LANE  } from './LaneActions';
import { CREATE_NOTE, DELETE_NOTE } from '../Note/NoteActions';


// Initial State
const initialState = [];


export default function lanes(state = initialState, action) {
  switch (action.type) {
    case CREATE_LANE :
      return [...state, action.lane];
    case UPDATE_LANE :
      return state.map(lane => {
        if (lane.id === action.id) {
          return Object.assign({}, lane, action.lane);
        }
        return lane;
      });
    case DELETE_LANE :
      return state.filter(lane => lane.id !== action.laneId);
    // this is update reducer for add note!
    case CREATE_NOTE :
      return state.map(lane => {
        if (lane.id === action.laneId) {
          const notes = [...lane.notes, action.note.id];
          return { ...lane, notes };
        }
        return lane;
      })
    // this is update reducer for delete note!  kodilla quest !
    case DELETE_NOTE :
      return state.map(lane => {
        if (lane.id === action.laneId ) {
          return lane.notes.filter(note => note.id !== action.note.id);
        }
        return lane;
      })
    // Kodilla quest.
    case EDIT_LANE :
      return state.map(lane => {
        if (lane.id === action.laneId) {
          return {...lane, editing: true }
        } else {
          return lane;
        }
      })
      

    default:
      return state;
    }
}


