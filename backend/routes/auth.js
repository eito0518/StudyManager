const router = require("express").Router();
const User = require("../models/UserSchema");

// ユーザー登録
router.post("/register", async (req, res) => {
  try {
    // Userモデルをインスタンス化
    const newUser = await new User({
      username: req.body.username,
      password: req.body.password,
    });
    // データベースに保存
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ログイン
router.post("/login", async (req, res) => {
  try {
    // usernameでユーザーを検索
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).json("ユーザーが見つかりません");
    }
    // 保存されているパスワードと照合
    const validPassword = user.password === req.body.password;
    if (!validPassword) {
      res.status(400).json("パスワードが違います");
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
