import React from "react";
import TaskList from "./TaskList";

function TaskCompletion({ tasks, updateTask, deleteTask }) {
  return (
    <div>
      <h2>タスク消化画面</h2>
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}

export default TaskCompletion;