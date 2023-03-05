import React, {useState, useEffect} from "react";
import { MdAddCircle } from "react-icons/md";
import { TiTrash, TiPencil } from "react-icons/ti";
import './TodoInsert.css'

const TodoInsert = ({
    onInsertToggle, 
    onInsertTodo, 
    selectedTodo, 
    onRemove,
    onUpdate
    }) => {
    console.log("TodoInsert Component 실행")

    const [content, setContent] = useState("");
    const [name, setName] = useState("");

    const onChangeContent = e => {
        setContent(e.target.value);
    };

    const onChangeName = e => {
        setName(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onInsertTodo(name, content);
        setContent("");
        setName("");
        onInsertToggle();
    }

    useEffect(() => {
        if (selectedTodo) {
            setContent(selectedTodo.content);
            setName(selectedTodo.name)
        }
    }, [selectedTodo]);
    return (
    <div>
        <div className="background" onClick={onInsertToggle}></div>
        <form onSubmit={selectedTodo ? () => {
            onUpdate(selectedTodo.id, name, content, selectedTodo.checked)} : onSubmit
        
            }>
            <input
                placeholder="please name"
                value={name}
                onChange={onChangeName}
            ></input>
            <input
                placeholder="please content"
                value={content}
                onChange={onChangeContent}
            ></input>
            {selectedTodo ? (
                <div className="rewrite">
                    <TiPencil 
                        onClick={() => {
                            onUpdate(selectedTodo.id, name, content, selectedTodo.checked)
                        }}
                    />
                    <TiTrash onClick={() => onRemove(selectedTodo.id)}/>
                </div>
            ) : (
                <button type="submit">
                    <MdAddCircle/>
                </button>
            )}
        </form>
    </div>
    );
};

export default TodoInsert;