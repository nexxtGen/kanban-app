import Lane from '../models/lane';
import uuid from 'uuid';

/*
export function getSomething(req, res) {
  return res.status(200).end();
}
*/
//Implements Add lane/table functionality
export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}
// get all lanes
export function getLanes(req, res) {
  Lane.find().exec((err, lanes) =>{
    if (err) {
      res.status(500).send(err);
    }
    res.json({lanes});
  })
}
// delete lane by id
export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId}).exec((err, lane) =>{
    if (err) {
      res.status(500).send(err);
    }
    //delete notes in lane- kodilla quest 2.------
    if (lane.notes.length) {
			lane.notes.forEach(note => note.remove());
    }
    //-----
    lane.remove(() =>{
      res.status(200).end();
    })
  })
}
//kodilla quest edit name of lane
export function editLane(req, res) {
  Lane.findOneAndUpdate({ id: req.params.laneId }, { $set: { name: req.body.name}}, {new: true}).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lane });
  })
}

// kodilla q
export function moveBetweenLanes(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
    //spr w robo str lany
    //1. muszę znaleźć w tablicy lane.notes element z req.body.noteId
    //2. Muszę zachować ten element w zmiennej
    //3. naastępnie musze usunąć z ten element ze starej tablicy
    //4 Nastepnie znaleźć docelową lanę
    //5. Przeniesć element pushem do tablicy notes targetowanej lany
    const targetNote = lane.notes.find( note => note.id === req.body.noteId); //1, 2
    lane.notes.map(note => note.id !== req.body.noteId ); //3
    lane.save(err => {
      if (err) {
				res.status(500).send(err);
			}
			res.json(lane);
    });

    Lane.findOne({ id: req.body.targetLaneId}).then(target => { //4
      target.notes.push(targetNote); //5
      target.save(err => {
        if (err) {
					res.status(500).send(err);
				}
      });
    });
  });
}
