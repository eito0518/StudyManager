const router = require("express").Router();
const User = require("../models/UserSchema");

// ユーザー情報の取得
router.get("/:id", async (req, res) => {
  try {
    // _idでユーザーを検索
    const user = await User.findById(req.params.id);
    // パスワードと更新日時を除いたユーザー情報をotherに格納
    const { password, updatedAt, ...other } = user._doc; // _docでmongoose形式から通常のオブジェクト形式に変換し、分割代入する
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// ユーザー情報を更新
router.put("/:id", async (req, res) => {
  // ユーザーIDが一致するか、管理者かどうかを確認
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      // _idでユーザーを検索して更新
      const user = await User.findByIdAndUpdate(
        req.params.id, // _idでユーザーを検索
        { $set: req.body } // 更新するユーザー情報
      );
      res.status(200).json("ユーザー情報が更新されました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("あなたは自分のアカウントの時だけ更新できます");
  }
});

// ユーザー情報を削除
router.delete("/:id", async (req, res) => {
  // ユーザーIDが一致するか、管理者かどうかを確認
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      // _idでユーザーを検索して削除
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("ユーザー情報が削除されました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("あなたは自分のアカウントの時だけ削除できます");
  }
});

module.exports = router;
