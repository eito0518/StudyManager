import React, { useState, useEffect } from "react";
import "./LevelDisplay.css";

const LevelDisplay = ({ initialXp = 0, subjectName }) => {
  const [xp, setXp] = useState(initialXp);

  let isDead = xp < 0; // 死亡状態かどうか

  // XPが24時間ごとに1減少
  useEffect(() => {
    const interval = setInterval(() => {
      setXp((prevXp) => {
        if (prevXp > 0) {
          return prevXp - 1;
        } else {
          isDead(true);
          return 0;
        }
      });
    }, 24 * 60 * 60 * 1000); // 24時間ごとに実行

    return () => clearInterval(interval);
  }, []);

  // 初期XPが変更された場合に更新
  useEffect(() => {
    setXp(initialXp);
  }, [initialXp]);

  // レベルの計算
  const level = Math.max(1, Math.floor(xp / 100) + 1); // XPが0でも最低レベル1
  const nextLevelXp = isDead ? 0 : level * 100; // 次のレベルに必要なXP
  const progressPercentage = xp ? ((xp % 100) / 100) * 100 : 0; // 進捗バーの割合

  // たまごっちの表情を変更
  const getTamagotchiImage = () => {
    if (isDead) return "☠️"; // 死亡状態
    if (level < 5) return "🐣"; // レベル1-4
    if (level < 10) return "😊"; // レベル5-9
    return "😎"; // レベル10以上
  };

  // 削除ボタンのクリックハンドラー
  const handleDelete = () => {
    isDead = true; // 死亡状態かどうか;
    setXp(-1);
  };

  console.log(
    `Rendering LevelDisplay for ${subjectName} with XP: ${xp}, Level: ${level}, Image: ${getTamagotchiImage()}`
  );

  return (
    <div className="level-display-card bg-base-200 shadow-lg p-4 rounded-lg flex flex-col items-center relative">
      <h3 className="text-xl font-bold">{subjectName}</h3>
      <div className="text-6xl">{getTamagotchiImage()}</div>

      {!isDead ? (
        <>
          {/* レベルの表示 */}
          <h4 className="text-lg font-semibold mt-2">レベル: {level}</h4>

          {/* 進捗バー */}
          <div className="level-display-progress w-full bg-gray-300 rounded-full h-4 mt-2">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* XPの表示 */}
          <p className="text-sm text-gray-400">
            XP: {xp} / {nextLevelXp}
          </p>
        </>
      ) : (
        <p className="text-lg font-semibold mt-2">死亡しました！</p>
      )}

      {/* 削除ボタン */}
      <button className="level-display-delete-button" onClick={handleDelete}>
        削除
      </button>
    </div>
  );
};

export default LevelDisplay;
