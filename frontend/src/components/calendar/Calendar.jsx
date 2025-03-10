import { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

const Calendar = ({ subjects }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // カレンダーメニューの表示切り替え
  const toggleCalendarMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // カレンダーの日付に表示する教科の色
  const subjectColors = [
    "#FFD700", // ゴールド
    "#FF4500", // オレンジレッド
    "#1E90FF", // ドッジブルー
    "#32CD32", // ライムグリーン
    "#9370DB", // ミディアムパープル
  ];

  // react-calendar の各タイルに表示する科目名を生成する関数
  const renderTileContent = ({ date, view }) => {
    // 月表示モード かつ subjects が存在する場合のみ処理を実行
    if (view === "month" && subjects) {
      // subjects からカレンダーのセルの日付と一致する教科を取得
      const subjectsForTheMonth = subjects
        .filter(
          (subject) =>
            // 時刻情報を無視して比較
            new Date(subject.date).toDateString() === date.toDateString()
        )
        .slice(0, 4); // 各セルにつき最大4つの教科を表示
      return (
        <div className="subjects">
          {subjectsForTheMonth.map((subject, index) => (
            <div
              key={index}
              className="subject"
              style={{
                // 色を順番に教科に割り当てる
                backgroundColor: subjectColors[index % subjectColors.length],
              }}
            >
              {subject.name} {/* 教科名を表示 */}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // カレンダーメニューの表示
  return (
    <>
      <button className="hamburger-button-right" onClick={toggleCalendarMenu}>
        &#9776; {/*  HTMLエンティティ：ハンバーガーアイコン */}
      </button>
      <div className={`menu-right ${isMenuOpen ? "open-menu-right" : ""}`}>
        <button className="close-button-right" onClick={toggleCalendarMenu}>
          &times; {/* HTMLエンティティ：×ボタン */}
        </button>
        <div className="menu-content-right">
          <div className="calendar-container">
            <h3 className="calendar-title">テスト日程</h3>
            <ReactCalendar
              tileContent={renderTileContent}
              formatDay={(locale, date) => date.getDate()} // 日付を数字のみ表示
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
