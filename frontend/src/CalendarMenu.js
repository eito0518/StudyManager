import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./CalendarMenu.css";

const CalendarMenu = ({ subjects }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    console.log("テスト", subjects); // subjectsの内容を確認

    // カレンダーの日付に表示する教科の色
    const colors = [
        "#FFD700", // ゴールド
        "#FF4500", // オレンジレッド
        "#1E90FF", // ドッジブルー
        "#32CD32", // ライムグリーン
        "#9370DB", // ミディアムパープル
    ];

    //カレンダーの日付に科目名を表示するreact-calendarの関数
    const tileContent = ({ date, view }) => {
        if (view === 'month' && subjects) {
            const subjectsForTheDay = subjects.filter(subject =>
                new Date(subject.date).toDateString() === date.toDateString()
            ).slice(0, 4); // 最大4つの教科を取得
            return (
                <div className="subjects">
                    {subjectsForTheDay.map((subject, index) => (
                        <div
                            key={index}
                            className="subject"
                            style={{
                                backgroundColor: colors[index % colors.length]
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
        <div>
            <button className="hamburger-button-right" onClick={toggleMenu}>
                &#9776;
            </button>
            <div className={`menu-right ${isOpen ? "open-menu-right" : ""}`}>
                <button className="close-button-right" onClick={toggleMenu}>
                    &times;
                </button>
                <div className="menu-content-right">
                    <div className="calendar-container">
                        <h3 className="calendar-title">カレンダー</h3>
                        <Calendar
                            value={value}
                            onClickDay={(e) => setValue(e)}
                            tileContent={tileContent}
                            formatDay={(locale, date) => date.getDate()} // 日付から「日」を除く
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarMenu;