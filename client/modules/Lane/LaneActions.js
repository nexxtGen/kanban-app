//import uuid from 'uuid';
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
      });
    };
}

export function updateLane(lane) {
    return {
        type: UPDATE_LANE,
        lane,
    };
}

//Q
export function updateLaneRequest(lane) {
	return dispatch => {
		return callApi(`lanes/${lane.id}`, 'put',  lane ).then(() => { /// eee
			dispatch(updateLane(lane)); // !!
		});
	};
}

export function deleteLane(laneId) {
    return {
        type: DELETE_LANE,
        laneId
    };
}
//quest
export function deleteLaneRequest(laneId) {
    return (dispatch) => {  // brak returna było
      return callApi(`lanes/${laneId}`, 'delete').then(() => {
        dispatch(deleteLane(laneId));
      });
    };
  }
//kodilla quest tryb edit column/lane
export function editLane(laneId) {
    return {
        type: EDIT_LANE,
        id: laneId  // !!!!!!!!!!!!!!!!!!!! kudła!
    }
}
//v3 integration. Endpoint methods

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
      })
    };
}

export function laneError(err) {
    return {
        type: LANE_ERROR,        
        err      
    }
}
export function laneNoError() {
    return {
        type: LANE_NO_ERROR, 
    }
}