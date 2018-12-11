import uuid from 'uuid';
// Import Actions
import { CREATE_LANE, UPDATE_LANE, DELETE_LANE, EDIT_LANE, CREATE_LANES  } from './LaneActions';
import { CREATE_NOTE, DELETE_NOTE } from '../Note/NoteActions';

import omit from 'lodash/omit';

// Initial State
const initialState = {};


export default function lanes(state = initialState, action) {
  switch (action.type) {
    case CREATE_LANE :
    case UPDATE_LANE :
      return { ...state, [action.lane.id]: action.lane };    
      /* return state.map(lane => {
        if (lane.id === action.id) {
          return Object.assign({}, lane, action.lane);
        }
        return lane;
      });  */
      //return [...state, action.lane];      
    case CREATE_LANES:
      return { ...action.lanes };
    case DELETE_LANE :  {
      return omit(state, action.laneId);
    }   
     // return state.filter(lane => lane.id !== action.laneId);
    // this is update reducer for add note!
    case CREATE_NOTE : {
      const newLane = { ...state[action.laneId] };
      newLane.notes = newLane.notes.concat(action.note.id);

      return { ...state, [action.laneId]: newLane };
    }
      /*return state.map(lane => {
        if (lane.id === action.laneId) {
          const notes = [...lane.notes, action.note.id];
          return { ...lane, notes };
        }
        return lane;
      })*/
    // this is update reducer for delete note!  kodilla quest !
    case DELETE_NOTE : {
      const newLane = { ...state[action.laneId] };
      newLane.notes = newLane.notes.filter(noteId => noteId !== action.noteId);

      return { ...state, [action.laneId]: newLane };
    }
      /*return state.map(lane => {
        if (lane.id === action.laneId ) {
          const notes = lane.notes.filter(note => note.id !== action.noteId);
          //return Object.assign({}, lane, notes);
          return {...lane, notes};
        }
        return lane;
      })*/
    // Kodilla quest.
    case EDIT_LANE : {
      const lane = { ...state[action.id], editing: true };
      return { ...state, [action.id]: lane };
    }
      /*return state.map(lane => {
        if (lane.id === action.laneId) {
          return {...lane, editing: true }
        } else {
          return lane;
        }
      })*/
      

    default:
      return state;
    }
}


