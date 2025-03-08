import React, { useState } from "react";
import "./TaskList.css";

function TaskList({ tasks, updateTask, deleteTask, completeTask, isMainView }) {
  const [isCompleting, setIsCompleting] = useState(null);
  const [completionRating, setCompletionRating] = useState(1);

  const handleComplete = (index) => {
    setIsCompleting(index);
  };

  const handleCompletion = (index) => {
    completeTask(index, completionRating);
    setIsCompleting(null);
  };

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="task-list-container">
      <h3>タスク一覧</h3>
      <div className="task-list">
        <ul>
          {incompleteTasks.map((task, index) => (
            <li key={task._id} className="task-item">
              {isMainView ? (
                isCompleting === index ? (
                  <>
                    <span className="task-name">{task.description}</span>
                    <span className="task-priority">優先度 {task.priority}</span>
                    <select
                      value={completionRating}
                      onChange={(e) => setCompletionRating(Number(e.target.value))}
                    >
                      <option value={1}>理解度 1</option>
                      <option value={2}>理解度 2</option>
                      <option value={3}>理解度 3</option>
                      <option value={4}>理解度 4</option>
                      <option value={5}>理解度 5</option>
                    </select>
                    <button onClick={() => handleCompletion(index)}>完了</button>
                  </>
                ) : (
                  <>
                    <span className="task-name">{task.description}</span>
                    <span className="task-priority">優先度 {task.priority}</span>
                    <button onClick={() => handleComplete(index)}>完了</button>
                    <button onClick={() => deleteTask(index)}>削除</button>
                  </>
                )
              ) : (
                <>
                  <span className="task-name">{task.description}</span>
                  <span className="task-priority">優先度 {task.priority}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      {isMainView && (
        <>
          <h3>完了済みタスク</h3>
          <div className="task-list completed-tasks">
            <ul>
              {completedTasks.map((task, index) => (
                <li key={task._id} className="task-item">
                  <span className="task-name">{task.description}</span>
                  <span className="task-priority">優先度 {task.priority}</span>
                  <span className="task-rating">理解度 {task.understanding}</span>
                  <button onClick={() => deleteTask(index)}>削除</button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskList;
