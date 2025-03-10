const router = require("express").Router();
const Task = require("../models/TaskSchema");

// 全てのタスクを取得
router.get("/", async (req, res) => {
  try {
    // 全てのタスク情報を取得し、populateメソッドでtaskに紐付いたsubject情報も取得
    const tasks = await Task.find().populate("subjectId"); // subjectId"はTaskSchemaで定義
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 特定のタスクを取得
router.get("/:id", async (req, res) => {
  try {
    // _idでタスクを検索
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "タスクがありません" });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// タスクを作成
router.post("/", async (req, res) => {
  try {
    // Taskモデルのインスタンスを作成
    const newTask = new Task({
      description,
      priority,
      understanding,
      subjectId,
    });
    // データベースに保存
    const savedTask = await newTask.save();
    // populateメソッドでtaskに紐付いたsubject情報も取得
    const populatedTask = await savedTask.populate("subjectId");
    res.status(201).json(populatedTask);
  } catch (err) {
    console.error("タスクの追加に失敗:", err);
    res.status(500).json({ error: err.message });
  }
});

// タスクを更新
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, // _id でタスクを検索
      req.body, // 更新するタスク情報
      { new: true } // 更新後のデータを返す
    );
    if (!updatedTask)
      return res.status(404).json({ message: "タスクがありません" });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// タスクを削除
router.delete("/:id", async (req, res) => {
  try {
    // _idでタスクを検索して削除
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "タスクがありません" });
    res.status(200).json({ message: "タスクが削除されました" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 特定の教科に紐づいたタスクを一括削除
router.delete("/by-subject/:subjectId", async (req, res) => {
  try {
    const deletedTasks = await Task.deleteMany({ subjectId: subjectId });
    res.status(200).json({ message: "教科に紐付いたタスクを削除しました" });
  } catch (err) {
    res.status(500).json({ error: "教科に紐付いたタスクの削除に失敗しました" });
  }
});

module.exports = router;
