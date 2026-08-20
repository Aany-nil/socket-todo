const Task = require("../models/Task");

const createTask = async (title) => {
    try {
        if(!title) return null;

        const task = new Task({ title });
        await task.save();
        return task;

    } catch (error) {
        console.error("Task created error", error.message);
        return null;
        
    }
}

const getTask = async () => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1});
        return tasks;

    } catch (error) {
       console.error("Task get error", error.message)
       return [];
        
    }
}

const updateTask = async (id, data) => {
    try {
       const updatedTask = await Task.findByIdAndUpdate(
        id,
        data,
        { new: true }
       );
       
       return updatedTask;

    } catch (error) {
       console.error("Task update error", error.message)
       return null;        
    }
}

const deleteTask = async (id) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        return deletedTask;

    } catch (error) {
       console.error("Failed to Task delete", error.message)
       return null;
        
    }
}


module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask
}