import { useState, useEffect } from "react";

function TaskForm({ addTask, subjectId }) {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);

  useEffect(() => {
    if (!subjectId) {
      console.error("Error: subjectId is undefined in TaskForm!");
    } else {
      console.log("TaskForm received subjectId:", subjectId);
    }
  }, [subjectId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;
    if (!subjectId) {
      console.error("Error: subjectId is undefined");
      return;
    }
    console.log("handleSubmit subjectId:", subjectId); // subjectId をコンソールに出力
    addTask(subjectId, { description, priority });
    setDescription("");
    setPriority(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="タスク内容"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
        <option value={1}>優先度 1</option>
        <option value={2}>優先度 2</option>
        <option value={3}>優先度 3</option>
      </select>
      <button type="submit" className="btn btn-primary task-submit-button">追加</button>
    </form>
  );
}

export default TaskForm;