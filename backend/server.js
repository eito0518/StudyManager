const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
// const userRouter = require('./routes/users');
const authRouter = require("./routes/auth");
const subjectRouter = require("./routes/subjects");
const taskRouter = require("./routes/tasks");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

app.use(express.json()); //expressでjsonを使う
app.use(cors()); //CORSを許可(フロントエンドとバックエンドの通信を許可)

// Connect to MongoDB
//.envファイルに記述したURLを読み込む
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("888888888888888888888888888888"))
  .catch((err) => {
    console.log("エラーヨクキキトレマセンデシタ\n", err);
    process.exit(1); // 接続に失敗した場合、プロセスを終了
  });

// Routesの読み込み　try-catchでエラーをキャッチ
try {
  // app.use('/users', userRouter);
  app.use("/auth", authRouter);
  app.use("/subjects", subjectRouter);
  app.use("/tasks", taskRouter);
} catch (err) {
  console.log("ルートの読み込みエラー", err.message);
}

/*
//テスト用
app.get('/', (req, res) => {
    res.send("ねむいっす");
});
*/

// Serverを起動
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
