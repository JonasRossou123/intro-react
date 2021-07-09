
import { Checkbox, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from 'react';



const Todo = ({todo, toggleTodo, deleteTodo}) => {

    function handleTodoClick(){
        toggleTodo(todo.id)
    }

    function handleDeleteClick(){
        deleteTodo(todo.id)
    }

    return (
        <div>
            <label className="defaultfontsize">
                <Checkbox checked={todo.complete} onClick={handleTodoClick} />
                <span className="higher">{todo.name}</span>
                <IconButton className="delete" onClick={handleDeleteClick}>
                    <CloseIcon />
                </IconButton>
            </label>
        </div>
    );
};

export default Todo;