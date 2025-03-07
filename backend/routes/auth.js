const router = require("express").Router();
const User = require("../models/UserSchema");

//user registration API
router.post("/register", async (req, res) => {
  //ユーザー登録時に、usernameとpasswordを受け取り、新規ユーザーを作成
  //時間があったらbcryptとかでパスワードを暗号化したい
  try {
    const newUser = await new User({
      username: req.body.username,
      password: req.body.password,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//user login API
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }); //usernameで対象ユーザーを検索
    if (!user) {
      res.status(400).json("User not found");
    }

    const validPassword = user.password === req.body.password; //パスワードの照合
    if (!validPassword) {
      res.status(400).json("Wrong password");
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
