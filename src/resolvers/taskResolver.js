const Task = require('../models/Task');

const taskResolver = {
    Query: {
        tasks: async () => Task.find(),
        task: async (_, { id }) => Task.findById(id),
    },
    Mutation: {
        createTask: async (_, { title, description, status, dueDate, userId, organizationId }) => {
            const task = new Task({ title, description, status, dueDate, userId, organizationId });
            return task.save();
        },
        updateTask: async (_, { id, title, description, status, dueDate }) => {
            return Task.findByIdAndUpdate(id, { title, description, status, dueDate }, { new: true });
        },
        deleteTask: async (_, { id }) => {
            return Task.findByIdAndDelete(id);
        },
    },
};

module.exports = taskResolver;
