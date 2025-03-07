const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const subjectRouter = require("./routes/subjects");
const taskRouter = require("./routes/tasks");
const PORT = 4000;
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// ミドルウェアの設定
app.use(express.json()); // JSON形式のデータを受け取る
app.use(
  // CORSを許可(フロントエンドとバックエンドの通信を許可)
  cors({
    origin: "http://localhost:3000", // フロントエンドの URL のみ許可
    methods: "GET,POST,PUT,DELETE", // 許可する HTTP メソッド
  })
);
// ルーティングの設定
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/subjects", subjectRouter);
app.use("/tasks", taskRouter);

// データベース接続
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("データベースに接続しました");
  })
  .catch((err) => {
    console.log("データベースに接続失敗しました", err);
  });

// サーバー起動
app.listen(PORT, () => console.log(`サーバーが起動しました ポート${PORT}`));
