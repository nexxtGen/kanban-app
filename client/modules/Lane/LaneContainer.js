import { connect } from 'react-redux';
import Lane from './Lane';
//d&d
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';


import { deleteLaneRequest, updateLaneRequest, createLaneRequest, editLane, moveBetweenLanes } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => {
  return {
    //laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId]) // Prev ver
    // Mentor ver
    laneNotes: ownProps.lane.notes
    
      .filter(noteId => state.notes[noteId])
      .map(noteId => state.notes[noteId])

  
  };
};

const mapDispatchToProps =  {
  editLane,
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  addNote: createNoteRequest,
  createLane: createLaneRequest, 
  moveBetweenLanes, 
};

//d and d
const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const { id: noteId, laneId: sourceLaneId } = sourceProps;
 
    if (!targetProps.lane.notes.length) {
      targetProps.moveBetweenLanes(
        targetProps.lane.id,
        noteId,
        sourceLaneId,
      );
    }
  },
 };




//d and d
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);