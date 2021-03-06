import { connect } from 'react-redux';
import Notes from './Notes';
import { editNote, updateNoteRequest, deleteNoteRequest, moveWithinLane } from './NoteActions'; //ee

const mapDispatchToProps = {
  editNote,
	updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  moveWithinLane,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);