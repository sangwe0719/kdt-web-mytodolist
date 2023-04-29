import { useState } from "react";



const AddTodo = ({addItem}) => {
    const [todoItem, setTodoItems] = useState({
        title: '',
    });
    const [number, setNumber] =useState(3);

    const onButtonClick = () => {
        // 1.props additem 함수 실행
        addItem(todoItem)
        //addItem(newItem)
        // 2. input 초기화
        setTodoItems({
            title:""
        });
        
        setNumber(number + 1);
        
    };

     const onEnterKeyDown = (e) => {
            if(e.key === 'Enter') {
                onButtonClick();
            }
        }

    return (
        <>
        <h1 className="header">Todo list -<span> {number} todos</span></h1>
         <div className="AddTodo">
            <div>
            <input
            type="text"
            placeholder="Add your new Todo"
            value={todoItem.title}
            onChange={(e) => setTodoItems({ title: e.target.value})}
            onKeyDown={onEnterKeyDown}
            className="input"
            />
            </div>
            <div style={{display:"flex"}}>
            <button 
            onClick={onButtonClick} 
            className="AddTodo_btn"
            cla
            >
                < img className="plus_img" src={process.env.PUBLIC_URL + '/plus.png'} />
                </button>
            </div>
        </div>
        </>
    );
};

export default AddTodo;