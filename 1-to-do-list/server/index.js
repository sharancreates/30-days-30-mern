const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(
    ()=>console.log("mongodb is connected")
).catch(
    (err) => console.error(err)
);

const ToDo = new mongoose.Schema(
    {
        task: String,
        done: {type : Boolean, default: false}
    }
)

const TodoModel = mongoose.model('todos', ToDo);

// fetching tasks
app.get('/get', (req,res) => {
    TodoModel.find().then(
        result => res.json(result)
    ).catch(err => res.json(err))
}
);

// posting tasks
app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create(
        {task: task}
    ).then(
        result => res.json(result)
    ).catch(err => res.json(err))
}
);

// put: update task 
app.put('/update/:id', (req,res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({ _id: id }, { done: true }) 
        .then(result => res.json(result))
        .catch(err => res.json(err));
}
)

//delete
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});