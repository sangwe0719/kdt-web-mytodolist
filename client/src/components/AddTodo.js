import { useState } from "react";

const AddTodo = ({addItem}) => {
    const [todoItem, setTodoItems] = useState({
        title: '',
    });

    const onButtonClick = () => {
        // 1.props additem 함수 실행
        addItem(todoItem)
        //addItem(newItem)
        // 2. input 초기화
        setTodoItems({
            title:""
        });
    };

     const onEnterKeyDown = (e) => {
            if(e.key === 'Enter') {
                onButtonClick();
            }
        }

    return (
        <div className="AddTodo">
            <input
            type="text"
            placeholder="Add your new Todo"
            value={todoItem.title}
            onChange={(e) => setTodoItems({ title: e.target.value})}
            onKeyDown={onEnterKeyDown}
            />
            <button onClick={onButtonClick}>Add</button>
        </div>
    );
};

export default AddTodo;