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
//Kodilla quest add functionality to lane with notes
const noteTarget = { 
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const { id: noteId, laneId: sourceLaneId } = sourceProps;
    
    /*
    if (!targetProps.lane.notes.length) { // jeśli nie ma notek w targetowanej lanie
      targetProps.moveBetweenLanes( // to wykonaj metodę
        targetProps.lane.id,
        noteId,
        sourceLaneId,
      );
    } 
    */
    /* // Nie działa
    if (targetProps.lane.id !== sourceLaneId) { // if id docelowej lany jest inne od źródła to 
        targetProps.moveBetweenLanes( // to wykonaj metodę
          targetProps.lane.id, // docelowa
          noteId,   // id noty
          sourceLaneId,  // id źródła
        );
      } 
    */
      // sprawdzić czy docelowa lana nie zawiera notki o id przenoszonej notki
    const czyZawiera = targetProps.lane.notes.find( note => noteId === note);
    console.log('zawiera przed', zawiera)
    if (targetProps.lane.id !== sourceLaneId && czyZawiera === undefined) { // if (id) target jest inni od źródła oraz nie zawiera id notki to wykonaj
      targetProps.moveBetweenLanes( // to wykonaj metodę
        targetProps.lane.id,
        noteId,
        sourceLaneId,        
      );
    } // bingo!
  },
 };




//d and d
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);