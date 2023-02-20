import React, {useState, useEffect}from "react";
import './App.css';
import Template from './components/Template';
import TodoList from './components/TodoList';
import TodoInsert from './components/TodoInsert';
import {MdAddCircle} from 'react-icons/md';
import axios from 'axios';

let nextId = 4;
const App = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [todos, setTodos] = useState([
  ]);

const onInsertToggle = () => {
  if (selectedTodo) {
    setSelectedTodo(null)
  }
  setInsertToggle(prev => !prev);
}

const onInsertTodo = (text) => {
  console.log("onInsertTodo 실행")
  if (text === "") {
    return alert("할 일을 입력해주세요.")
  } else {
    const todo = {
      id: nextId,
      text,
      checked: false
    }
    setTodos(todos => todos.concat(todo));
    nextId++;
    insertData(text);
  }
};

const onCheckToggle = (id) => {
    setTodos(todos => todos.map(todo => (todo.id === id ? {...todo, checked: !todo.checked} : todo)))
}

const onChangeSelectedTodo = (todo) => {
  setSelectedTodo(todo)
}

const onRemove = id => {
  onInsertToggle();
  setTodos(todos => todos.filter(todo => todo.id !== id));
  removeData(id);
};

  const onUpdate = (id, text) => {
    onInsertToggle();
    setTodos(todos => todos.map(todo => todo.id === id ? {
      ...todo, text
    } : todo))
    updateData(id, text);
  }

  // Axios 전체 조회
    const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/plan");
      console.log("응답값 데이터 길이 : " + response.data.length);
      for (var i=0; i<response.data.length; i++) {
        console.log("i : "+i);
        const todo = {
          id: response.data[i].id,
          text : response.data[i].content,
          checked: false
        }
        setTodos(todos => todos.concat(todo));
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Axios 계획 추가
  const insertData = async (text) => {
    const requestData = {
      content: text
    }
    try {
      const response = await axios.post(`http://localhost:8080/plan`,requestData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  // Axios 계획 수정
    const updateData = async (id, text) => {
    const requestData = {
      id: id,
      content: text
    }
    try {
      const response = await axios.put("http://localhost:8080/plan",requestData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  // Axios 계획 삭제
  const removeData = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/plan/${parseInt(id)}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect( () => {
    fetchData();
  },[])


  return (
    <Template todoLength={todos.length}>
        <TodoList 
          todos={todos} 
          onCheckToggle={onCheckToggle} 
          onInsertToggle={onInsertToggle}
          onChangeSelectedTodo={onChangeSelectedTodo}/>
        <div className="add-todo-button" onClick={onInsertToggle}>
          <MdAddCircle />
        </div>
        {insertToggle && (<TodoInsert
          selectedTodo={selectedTodo}
          onInsertToggle={onInsertToggle} 
          onInsertTodo={onInsertTodo}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />)}
    </Template>
  );
};

export default App;