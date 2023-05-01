import { useState,useEffect } from "react";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import '../src/styles/App.scss';
import axios from 'axios';
import '../src/styles/AddTodo.scss';
import '../src/styles/Todo.scss';
import {API_BASE_URL} from './app-config';

console.log(API_BASE_URL);


function App() {
  const [todoItems, setTodoItems] = useState([]);

    useEffect(() => {
      const getTodos = async() => {
        const res = await axios.get('http://localhost:8000/api/todos');
        setTodoItems(res.data);
      }

      
    getTodos();
    },[]);


  // Todo 추가하는 함수
  const addItem = async (newItem) => {
    // // newItem => {title:'xxx'}
    // newItem.id = todoItems.length + 1;
    // newItem.done = false;
    // // newItem => { title: 'xxx', id: n, done: false}

    // setTodoItems([...todoItems, newItem ]);

    // axios 요청 날리기
    const res = await axios.post('http://localhost:8000/api/todo',newItem);
    console.log(res.data);
    // ...todoItems: 기존 아이템
    // res.data: 새로운 아이템 {id: n, title: 'xx', done: false }
    setTodoItems([newItem, ...todoItems]);
  };

  // Todo 삭제하는 함수
  const deleteItem = async (targetItem) => {
    // // targetItem => { title: 'xxx', id: n, done: false}
    // // 1.filter() 
    // //: targetItem의 id와 state와 id가 같지 않은 애들을 새로운 배열로 반환
    // const newTodoItems= todoItems.filter((item) => item.id !== targetItem.id )
    // // 2. state 변경
    // setTodoItems(newTodoItems);
    await axios.delete(`http://localhost:8000/api/todo/${targetItem.id}`);
    const newTodoItems = todoItems.filter((item) => item.id !== targetItem.id);
    setTodoItems(newTodoItems);
  }

  // Todo 수정하는 함수
  // (1) 서버 API를 이용해 db 데이터 업데이트
  // (2) 변경된 내용을 화면에 다시 출력
  const updateItem = async (targetItem) => {
    console.log(targetItem); // {id: n, title: 'xxx' , done: false}
    await axios.patch(
      `http://localhost:8000/api/todo${targetItem.id}`,
      targetItem
    );
  };

  return (
    <div className="App">
      {/* todo 추가 input */}
      <AddTodo addItem={addItem}/>
      <div className="left-todos">{todoItems.length} Todos !! </div>

      {/* todo 목록 보이기 */}
      {todoItems.length > 0 ?(
        todoItems.map((item) => {
          return  <Todo 
          key={item.id} 
          item={item} 
          deleteItem={deleteItem} 
          updateItem ={updateItem}
          />;
        })
      ) : (
        <p className = "empty-dodos">Todo를 추가해주세요..💢</p>
      )}
    </div>
  );
}

export default App;
