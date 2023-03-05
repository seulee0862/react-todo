import React, {useState, useEffect}from "react";
import './App.css';
import Template from './components/Template';
import TodoList from './components/TodoList';
import TodoInsert from './components/TodoInsert';
import {MdAddCircle} from 'react-icons/md';
import axios, { Axios } from 'axios';

let nextId = 0;
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

const onInsertTodo = (name, content) => {
  console.log("onInsertTodo 실행")
  if (content === "") {
    return alert("할 일을 입력해주세요.")
  } if (name === "") {
    return alert("제목을 입력해주세요.")
  } else {
    
    insertData(name, content); // http get
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

  const onUpdate = (id, name, content, success) => {
    onInsertToggle();
    setTodos(todos => todos.map(todo => todo.id === id ? {
      ...todo, name, content, success
    } : todo))
    updateData(id, name, content, success);
  }


  // todoData 화면 로드시 1번실행
   const todoData = async() => {
    

    try {
      const response = await axios.get("http://localhost:8080/todo");
      console.log(response.data.data.length);
      for (let i=0; i<response.data.data.length; i++) {
        console.log("i : "+i);
        const todo = {
          id: response.data.data[i].id,
          name : response.data.data[i].todoName,
          content : response.data.data[i].todoContent,
          checked: response.data.data[i].todoSuccess == "Y" ? true : false
        }
        nextId = response.data.data[i].id
        setTodos(todos => [...todos, todo]); // todo데이터 한번당 setTodos호출
      }
    } catch (error) {
      console.error(error);
    }

   };
  

   

  // Axios 계획 추가
  const insertData = async (name, content) => {
    const requestData = {
      todoName : name,
      todoContent : content
    }
    try {
      const response = await axios.post(`http://localhost:8080/todo`,requestData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  // Axios 계획 수정
    const updateData = async (id, name, content, success) => {
    const requestData = {
      todoName : name,
      todoContent : content,
      todoSuccess : success == true ? "Y" : "N"
      
    }
    try {
      console.log(id);
      const response = await axios.patch(`http://localhost:8080/todo/${parseInt(id)}`,requestData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  // Axios 계획 삭제
  const removeData = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/todo/${parseInt(id)}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect( () => {
    todoData();
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