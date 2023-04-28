import { useState } from "react";

const Todo = ({item, deleteItem}) => {
    console.log(item); // {done: false, id: 1, title: "저녁먹기"}
    const [todoItem,setTodoItems] = useState(item);
    const [readOnly, setReadOnly] = useState(true);

    const onDeleteButtonClick = () => {
        deleteItem(todoItem);
    };

    // title input 을 클릭; readOnly state를 false로 변경
    const offReadOnlyMode = () => {
        setReadOnly(false); // title input이 편집이 가능한 상태
    };

    // title input에서 enter키; readOnly state를 true로 변경
    const enterKeyEventHandler = (e) => {    
        if (e.key === 'Enter'){
            setReadOnly(true);
        }
    };

    //사용자가 키보드 입력할 때마다 item의 title을 입력한 값으로 변경
    const editEventHandler = (e) => {
        // rest: id, done 정보
        const { title, ...rest} = todoItem;
        setTodoItems({
            title: e.target.value,
            ...rest,
        });
    };

    // checkbox의 체크 여부에 따라 todoItem state의 done 상태값을 변경
    const checkboxEventHandler = (e) => {
        // e.target.checked
        const {done, ... rest} = todoItem;
        if (e.target.checked === true) {
            setTodoItems({
                done: true,
                ...rest
            })
        } else {
            setTodoItems({
                done: false,
                ...rest
            })
        }
    };

    return(
        <div className="Todo">
            <input 
            type="checkbox" 
            id={`todo${item.id}`} 
            name={`todo${item.id}`} 
            value={`todo${item.id}`}
            defaultChecked={item.done}
            onChange={checkboxEventHandler}
            />
            {/* <label htmlFor="todo0">{item.title}</label> */}
            <input 
            type="text" 
            value={todoItem.title} 
            onClick={offReadOnlyMode} 
            onKeyDown={enterKeyEventHandler}
            onChange={editEventHandler}
            />
            <button onClick={onDeleteButtonClick}>DELETE</button>
        </div>
    );
};

export default Todo;