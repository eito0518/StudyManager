const router = require("express").Router();
const Subject = require("../models/SubjectSchema");

// 全ての科目を取得
router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find({}); // subjects コレクション内のすべてのデータを取得
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 特定の科目を取得
router.get("/:id", async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id); // idで科目を検索
    if (!subject) return res.status(404).json({ message: "科目がありません" });
    res.status(200).json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 新しい科目を作成
router.post("/", async (req, res) => {
  try {
    const newSubject = new Subject(req.body); // リクエストデータをもとに Subject モデルのインスタンスを作成
    const savedSubject = await newSubject.save(); // データベースに保存
    res.status(201).json(savedSubject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 科目のXPを増やす
router.put("/:id/increase-xp", async (req, res) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id, // _id で科目を検索
      { $inc: { xp: req.body.increment } }, // xpを更新
      { new: true } // 更新後のデータを返す
    );
    if (!updatedSubject)
      return res.status(404).json({ message: "科目がありません" });
    res.status(200).json(updatedSubject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 科目情報を更新
router.put("/:id", async (req, res) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id, // _id で科目を検索
      req.body, // 科目情報を更新
      { new: true } // 更新後のデータを返す
    );
    if (!updatedSubject)
      return res.status(404).json({ message: "科目がありません" });
    res.status(200).json(updatedSubject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 科目を削除
router.delete("/:id", async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id); // idで科目を検索して削除
    if (!deletedSubject)
      return res.status(404).json({ message: "科目がありません" });
    res.status(200).json({ message: "科目が削除されました" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
