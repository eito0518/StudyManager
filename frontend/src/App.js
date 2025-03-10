import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import HamburgerMenu from "./components/HamburgerMenu";
import TaskCompletion from "./components/TaskCompletion";
import TaskList from "./components/TaskList";
import Calendar from "./components/calendar/Calendar"; //　移行完了
import LevelDisplay from "./components/LevelDisplay";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [xp, setXP] = useState({});
  const [showAll, setShowAll] = useState(false);

  // 全ての科目を取得
  const fetchSubjects = async () => {
    try {
      // 全ての科目習得APIを叩く
      const res = await axios.get(`${API_BASE_URL}/subjects`);
      // 取得したデータを格納
      setSubjects(res.data);

      const initialXp = res.data.reduce((acc, subject) => {
        acc[subject._id] = subject.xp || 0;
        return acc;
      }, {});
      setXP(initialXp);
    } catch (err) {
      console.error("科目の取得に失敗：", err);
    }
  };

  // 全てのタスクを取得
  const fetchTasks = async () => {
    try {
      // 全てのタスク取得APIを叩く
      const res = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error("タスクの取得に失敗：", err);
    }
  };

  // 初回レンダリング時に全ての科目とタスクを取得
  useEffect(() => {
    fetchSubjects();
    fetchTasks();
  }, []);

  // 科目追加
  const addSubject = async (subject) => {
    try {
      // 新しい科目を作成APIを叩く
      const res = await axios.post(`${API_BASE_URL}/subjects`, {
        name: subject.name,
        date: subject.date || new Date().toISOString().split("T")[0],
      });
      setSubjects([...subjects, res.data]);
    } catch (err) {
      console.error("科目の追加に失敗：", err.response?.data || err);
    }
  };

  // タスク追加
  const addTask = async (subjectId, task) => {
    try {
      const newTask = { ...task, subjectId };
      const res = await axios.post(`${API_BASE_URL}/tasks`, newTask);
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("タスクの追加に失敗:", err);
    }
  };

  // タスク更新
  const updateTask = async (taskIndex, updatedTask) => {
    try {
      const taskId = tasks[taskIndex]?._id;
      if (!taskId) {
        console.error("エラー: タスクIDが取得できません");
        return;
      }
      const res = await axios.put(
        `${API_BASE_URL}/tasks/${taskId}`,
        updatedTask
      );
      setTasks((prev) =>
        prev.map((task, index) => (index === taskIndex ? res.data : task))
      );
    } catch (err) {
      console.error("タスクの更新に失敗：", err.message);
    }
  };

  // タスク削除
  const deleteTask = async (taskIndex) => {
    try {
      const taskId = tasks[taskIndex]?._id;
      if (!taskId) {
        console.error("エラー: タスクIDが取得できません");
        return;
      }
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
      setTasks((prev) => prev.filter((_, index) => index !== taskIndex));
    } catch (err) {
      console.error("タスクの削除に失敗：", err.message);
    }
  };

  // タスク完了
  const completeTask = async (taskIndex, rating) => {
    try {
      const task = tasks[taskIndex];
      if (!task) {
        console.error("エラー: タスクが取得できません");
        return;
      }

      const xpIncrement = (rating || 0) * task.priority * 5;
      console.log(
        `XP計算式: (${rating} || 0) * ${task.priority} * 4 = ${xpIncrement}`
      );

      const updatedTask = { ...task, completed: true, understanding: rating };
      await axios.put(`${API_BASE_URL}/tasks/${task._id}`, updatedTask);

      let subjectId = task.subjectId;
      if (subjectId && typeof subjectId === "object") {
        subjectId = subjectId._id; // オブジェクトの場合は_idフィールドを使用
      }

      if (subjectId && typeof subjectId === "string") {
        const res = await axios.put(
          `${API_BASE_URL}/subjects/${subjectId}/increase-xp`,
          {
            increment: xpIncrement,
          }
        );

        const updatedSubject = res.data;
        setXP((prevXP) => ({
          ...prevXP,
          [subjectId]: updatedSubject.xp,
        }));
      } else {
        console.error("エラー: subjectIdが無効です");
      }

      setTasks((prev) =>
        prev.map((t, index) => (index === taskIndex ? updatedTask : t))
      );
    } catch (err) {
      console.error("タスクの完了に失敗:", err.message);
    }
  };

  // 科目編集
  const editSubject = async (subjectId, updatedSubject) => {
    try {
      await axios.put(`${API_BASE_URL}/subjects/${subjectId}`, updatedSubject);
      const newSubjects = subjects.map((subject) =>
        subject._id === subjectId ? { ...subject, ...updatedSubject } : subject
      );
      setSubjects(newSubjects);
    } catch (err) {
      console.error("科目の編集に失敗：", err);
    }
  };

  // 科目削除
  const deleteSubject = async (subjectId) => {
    try {
      // **教科に紐づいたタスクの削除**
      await axios.delete(`${API_BASE_URL}/tasks/by-subject/${subjectId}`);

      // **教科の削除**
      await axios.delete(`${API_BASE_URL}/subjects/${subjectId}`);

      //削除後のデータ取得
      await fetchTasks();
      setSubjects((prevSubjects) =>
        prevSubjects.filter((subject) => subject._id !== subjectId)
      );
      console.log(`教科 ${subjectId} と紐づいたタスクを削除しました`);
    } catch (err) {
      console.error("科目の削除に失敗：", err);
    }
  };

  console.log("Subjects:", subjects);
  console.log("XP:", xp);

  return (
    <BrowserRouter>
      <div className="App">
        <HamburgerMenu
          subjects={subjects}
          setSubjects={setSubjects}
          addSubject={addSubject}
          editSubject={editSubject}
          deleteSubject={deleteSubject}
          tasks={tasks}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          completeTask={completeTask}
        />
        <h2 className="app-title">Study Manager</h2>

        {/* タスク一覧 */}
        <Routes>
          <Route
            path="/task-completion"
            element={
              <TaskCompletion
                tasks={tasks}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            }
          />
          <Route
            path="/"
            element={
              <TaskList
                tasks={tasks}
                completeTask={completeTask}
                isMainView={true}
              />
            }
          />
        </Routes>

        <Calendar subjects={subjects} />

        {/* レベル表示（横スクロール対応） */}
        <div className="level-display-container flex flex-wrap justify-center gap-4 p-4">
          {(showAll ? subjects : subjects.slice(0, 3)).map((subject) => (
            <div key={uuidv4()} className="min-w-[16rem] flex-shrink-0">
              <LevelDisplay
                initialXp={xp[subject._id] || 0}
                subjectName={subject.name}
              />
            </div>
          ))}
        </div>

        {/* もっと見る/隠す ボタン */}
        {subjects.length > 3 && (
          <div className="show-more-button-container">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-primary"
            >
              {showAll ? "隠す" : "もっと見る"}
            </button>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
