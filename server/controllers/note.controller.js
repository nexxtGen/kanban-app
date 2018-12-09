import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid';

//Add note method to mongo
export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}
// Quest by kodilla
//delete single note - kodilla quest 1  - edytować tak by notka była usuwana takze z z Lane !!
export function deleteNote(req, res) {
  Note.findOne({ id: req.params.noteId}).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }
    console.log('deleteNote: laneId-- ', laneId);
    Lane.findOne({ id: req.params.laneId })      
      .then(lane => {
        lane.notes.findOneAndDelete( {id: req.params.noteId});
      })
    note.remove(() => {
      res.status(200).end();
      console.log('deleteNote: laneId-- ', laneId);
    })
  })
}
//quest edit note 
export function editNote(req, res) {
	Note.findOneAndUpdate({ id: req.params.noteId }, { $set: {task: req.body.note.task} }, {new: true}).exec((err, note) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({ note });
	});
}

