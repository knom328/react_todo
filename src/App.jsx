import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  // 入力したTODO
  const [todoText, setTodoText] = useState("");
  // 未完了のTODOリスト
  const [incompleateTodos, setIncompleateTodos] = useState([]);
  // 完了のTODOリスト
  const [compleateTodos, setCompleateTodos] = useState([]);

  // 入力したい値をtodoTextに設定
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタンのevent
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleateTodos, todoText];
    setIncompleateTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleateTodos];
    newTodos.splice(index, 1);
    setIncompleateTodos(newTodos);
  };
  const onClickCompleate = (index) => {
    // 未完了Listから削除
    const newIncompleateTodos = [...incompleateTodos];
    newIncompleateTodos.splice(index, 1);
    // 完了Listへ追加
    const newCompleateTodos = [...compleateTodos, incompleateTodos[index]];
    // set
    setIncompleateTodos(newIncompleateTodos);
    setCompleateTodos(newCompleateTodos);
  };

  const onClickBack = (index) => {
    // 完了Listから削除
    const newCompleateTodos = [...compleateTodos];
    newCompleateTodos.splice(index, 1);
    // 未完了Listへ追加
    const newIncompleateTodos = [...incompleateTodos, compleateTodos[index]];
    // set
    setCompleateTodos(newCompleateTodos);
    setIncompleateTodos(newIncompleateTodos);
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>

      <div className="incompleate-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleateTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickCompleate(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>

      <div className="compleate-area">
        <p className="title">完了のTODO</p>
        <ul>
          {compleateTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
