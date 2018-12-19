
import callApi from '../../util/apiCaller';
import { lanes } from '../../util/schema';
import { normalize } from 'normalizr';
import { createNotes } from '../Note/NoteActions';

// Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const EDIT_LANE = 'EDIT_LANE';
export const CREATE_LANES = 'CREATE_LANES';
export const FETCH_LANES = "FETCH_LANES";
export const LANE_ERROR = "LANE_ERROR";
export const LANE_NO_ERROR = "LANE_NO_ERROR";
export const MOVE_BETWEEN_LANES = 'MOVE_BETWEEN_LANES';

// Export Actions
export function createLane(lane) {
    return {
        type: CREATE_LANE,
        lane: {            
            notes: [],
            ...lane,
        }
    };
}

export function createLaneRequest(lane) {
    return (dispatch) => {
      return callApi('lanes', 'post', lane).then(res => {
        dispatch(createLane(res));
      }).catch( err => {
        console.log('createLaneRequest error: ', err);            
      });
    };
}

export function updateLane(lane) {
    return {
        type: UPDATE_LANE,
        lane,
    };
}

export function updateLaneRequest(lane) {
	return dispatch => {
		return callApi(`lanes/${lane.id}`, 'put',  lane ).then(() => { /// eee
			dispatch(updateLane(lane)); // !!
		}).catch( err => {
            console.log('updateLaneRequest error: ', err);            
        });
	};
}

export function deleteLane(laneId) {
    return {
        type: DELETE_LANE,
        laneId,
    };
}

export function deleteLaneRequest(laneId) {
    return (dispatch) => { 
      return callApi(`lanes/${laneId}`, 'delete').then(() => {
        dispatch(deleteLane(laneId));
      }).catch( err => {
        console.log('deleteLaneRequest error: ', err);            
      });
    };
  }

export function editLane(laneId) {
    return {
        type: EDIT_LANE,
        id: laneId,  
    }
}

export function createLanes(lanesData) {
    return {
      type: CREATE_LANES,
      lanes: lanesData,
    };
}

export function fetchLanes() {
    return (dispatch) => {
      return callApi('lanes').then(res => {
        const normalized = normalize(res.lanes, lanes);
        const {lanes: normalizedLanes, notes} = normalized.entities;
        dispatch(createLanes(normalizedLanes));
        dispatch(createNotes(notes));  
        dispatch(laneNoError());      
      }).catch( err => {
          console.log('Fetch Lanes err: ', err);
          dispatch(laneError(err));
      });
    };
}

export function laneError(err) {
    return {
        type: LANE_ERROR,        
        err,      
    }
}
export function laneNoError() {
    return {
        type: LANE_NO_ERROR, 
    }
}

export function moveBetweenLanes(targetLaneId, noteId, sourceLaneId) {
  return {
    type: MOVE_BETWEEN_LANES,
    targetLaneId,
    noteId,
    sourceLaneId,
  };
}

export function moveBetweenLanesRequest(targetLaneId, noteId, sourceLaneId) {
    return (dispatch) => {
        return callApi (`lanes/${sourceLaneId}/moveBetween`, 'put', {targetLaneId, noteId} ).then(() =>{
            dispatch(moveBetweenLanes(targetLaneId, noteId, sourceLaneId));
        }).catch( err => {
            console.log('move Between Lanes Request error: ', err);            
        });
    };
}