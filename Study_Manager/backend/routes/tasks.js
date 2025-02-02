const router = require('express').Router();
const Task = require('../models/TaskSchema');

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate("subjectId");
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "タスクがありません" });
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { description, priority, subjectId } = req.body;
        if (!description || !priority || !subjectId) {
            return res.status(400).json({ error: "必要なフィールドが不足しています" });
        }
        const newTask = new Task({
            description,
            priority,
            subjectId
        });
        const savedTask = await newTask.save();
        const populatedTask = await savedTask.populate("subjectId");
        res.status(201).json(populatedTask);
    } catch (err) {
        console.error("タスクの追加に失敗:", err);
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ message: "タスクがありません" });
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: "タスクがありません" });
        res.status(200).json({ message: "タスクが削除されました" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;