import { useState } from "react";

function SubjectForm({ addSubject }) {
  const [name, setName] = useState("");
  const [testDate, setTestDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !testDate) return;
    const formattedDate = new Date(testDate); // 日付をDateオブジェクトに変換
    addSubject({ name, date: formattedDate });
    setName("");
    setTestDate("");
  };

  return (
    <div>
      <h2>教科を登録</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="教科名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={testDate}
          onChange={(e) => setTestDate(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary task-submit-button">追加</button>
      </form>
    </div>
  );
}

export default SubjectForm;
