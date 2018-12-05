import mongoose from 'mongoose';
const Schema = mongoose.Schema;

mongoose.plugin(schema => { schema.options.usePushEach = true });

const laneSchema = new Schema({
    name: { type: 'String', required: true },
    notes: [{ type: Schema.ObjectId, ref: 'Note', required: true}],
    id: { type: 'String', required: true, unique: true},
});
/*
laneSchema.pre('find', function (next) {
    this.populate('notes');
    next();
});
*/
function populateNotes(next) {
    this.populate('notes');
    next();
}

laneSchema.pre('find', populateNotes);
laneSchema.pre('findOne', populateNotes);
// kodilla quest 2 ---------
//laneSchema.pre('remove', populateNotes);
//-------- quest end
//Kodilla quest 4
laneSchema.pre('findOneAndUpdate', populateNotes);
//---- quest end

export default mongoose.model('Lane', laneSchema);
