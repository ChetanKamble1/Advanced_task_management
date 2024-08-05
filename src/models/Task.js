const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, required: true, enum: ['Pending', 'In Progress', 'Completed'] },
    dueDate: { type: Date },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
});

module.exports = mongoose.model('Task', taskSchema);
