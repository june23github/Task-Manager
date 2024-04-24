const Task = require('../models/Task');

const getAllTasks = (req, res, next) => {
    Task.find().exec().then(tasks => {
        res.status(200).json({tasks})
    })
    
}


const createTask =(req, res, next) =>{
    const task = new Task({
        name : req.body.name
    })
    task.save().then(result => {
        res.status(201).json({result})
    })
    
}

const getTask = (req, res, next) =>{
    const {id: taskID} = req.params
    const task = Task.findOne({_id: taskID}).exec()
    .then(task => {
        res.status(200).json({task})
    })
    if(!task){
        return next(createCustomError(`No task with ID ${taskID}`), 404)
    }
    
}

const updateTask = (req, res, next)=>{
    const {id: taskID} = req.params
    const task = Task.updateOne({_id: taskID}, req.body, {
        new: true,
        runValidators: true,
    }).exec()
    .then(task => {
        res.status(200).json({task})
    })
    
}

const deleteTask  = (req, res, next)=>{
    const {id: taskID} = req.params
    const task = Task.findByIdAndDelete({_id: taskID})
    .exec()
    .then(task => {
        res.status(200).json({ task })
    })
}

module.exports ={
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}