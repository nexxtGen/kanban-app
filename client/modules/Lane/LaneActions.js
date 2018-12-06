import uuid from 'uuid';
import callApi from '../../util/apiCaller';

// Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const EDIT_LANE = 'EDIT_LANE';
// Export Actions

export function createLane(lane) {
    return {
        type: CREATE_LANE,
        lane: {
            id: uuid(),
            notes: [],
            ...lane,
        }
    };
}

export function updateLane(lane) {
    return {
        type: UPDATE_LANE,
        lane,
    };
}
  
export function deleteLane(laneId) {
    return {
        type: DELETE_LANE,
        laneId
    };
}
//kodilla quest tryb edit column/lane
export function editLane(laneId) {
    return {
        type: EDIT_LANE,
        laneId
    }
}
