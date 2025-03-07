import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import { v4 as uuidv4 } from 'uuid';

function SubjectList({ subjects, addTask, editSubject, deleteSubject }) {
  const [isEditing, setIsEditing] = useState(null);
  const [editedSubject, setEditedSubject] = useState({ name: "", priority: 1, date: "" });

  useEffect(() => {
    console.log("Updated subjects:", subjects);
  }, [subjects]);

  console.log("Subjects in SubjectList:", subjects); // デバッグ用

  if (!subjects || subjects.length === 0) {
    return <p>Loading subjects...</p>; // subjects が空なら表示
  }

  // 編集モードにする
  const handleEditClick = (index) => {
    setIsEditing(index);
    setEditedSubject(subjects[index] || { name: "", testDate: "" });
  };

  // 編集内容を保存
  const handleSaveClick = (index) => {
    

    if (editSubject) {
      editSubject(subjects[index]._id, editedSubject);
    }

    setIsEditing(null);
  };

  return (
    <div>
      <h2>登録された教科</h2>
      <ul>
        {subjects.map((subject, index) => (
          <li key={uuidv4()}>
            {isEditing === index ? (
              <div>
                <input
                  type="text"
                  value={editedSubject.name}
                  onChange={(e) => setEditedSubject({ ...editedSubject, name: e.target.value })}
                />
                <select
                  value={editedSubject.priority}
                  onChange={(e) => setEditedSubject({ ...editedSubject, priority: Number(e.target.value) })}
                >
                  <option value={1}>優先度 1</option>
                  <option value={2}>優先度 2</option>
                  <option value={3}>優先度 3</option>
                </select>
                <input
                  type="datetime-local"
                  value={new Date(editedSubject.date).toISOString().slice(0, 16)}
                  onChange={(e) => setEditedSubject({ ...editedSubject, date: new Date(e.target.value).toISOString() })}
                />
                <button onClick={() => handleSaveClick(index)}>保存</button>
              </div>
            ) : (
              <div>
                {subject.name} - {new Date(subject.date).toLocaleString()}
                <button onClick={() => handleEditClick(index)}>編集</button>
                <button className="delete-button" onClick={() => deleteSubject(subject._id)}>削除</button>
              </div>
            )}
            {/* `subject._id` を `TaskForm` に正しく渡す */}
            <TaskForm key={uuidv4()} addTask={addTask} subjectId={subject._id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubjectList;
