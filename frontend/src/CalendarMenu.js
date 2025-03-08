import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarMenu.css";

const CalendarMenu = ({ subjects }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // カレンダーの日付に表示する教科の色
  const colors = [
    "#FFD700", // ゴールド
    "#FF4500", // オレンジレッド
    "#1E90FF", // ドッジブルー
    "#32CD32", // ライムグリーン
    "#9370DB", // ミディアムパープル
  ];

  //カレンダーに科目名を表示するためのreact-calendarの関数
  const tileContent = ({ date, view }) => {
    if (view === "month" && subjects) {
      const subjectsForTheDay = subjects
        .filter(
          (subject) =>
            new Date(subject.date).toDateString() === date.toDateString()
        )
        .slice(0, 4); // 最大4つの教科を取得
      return (
        <div className="subjects">
          {subjectsForTheDay.map((subject, index) => (
            <div
              key={index}
              className="subject"
              style={{
                backgroundColor: colors[index % colors.length],
              }}
            >
              {subject.name}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <button className="hamburger-button-right" onClick={toggleMenu}>
        &#9776; {/*  HTMLエンティティ：ハンバーガーアイコン */}
      </button>
      <div className={`menu-right ${isOpen ? "open-menu-right" : ""}`}>
        <button className="close-button-right" onClick={toggleMenu}>
          &times; {/* HTMLエンティティ：×ボタン */}
        </button>
        <div className="menu-content-right">
          <div className="calendar-container">
            <h3 className="calendar-title">カレンダー</h3>
            <Calendar
              value={value}
              onClickDay={setValue}
              tileContent={tileContent}
              formatDay={(locale, date) => date.getDate()} // 日付を数字のみ表示
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarMenu;
