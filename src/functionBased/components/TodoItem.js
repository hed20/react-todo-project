import React, {useState, useEffect} from "react";
import styles from "./TodoItem.module.css"
import { FaTrash } from "react-icons/fa"

const TodoItem = (props) => {

    const [editing, setEditing] = useState(false)

    const handleEditing = () => {
        setEditing(true)
    }

    const handleUpdateDone = (event) => {
        if (event.key === "Enter") {
            setEditing(false)
        }
    } 
    
    //Clean deleted data from DOM to avoid memory leak
    useEffect(() => {
        return () => {
            console.log("Cleaning up...")
        }
    }, [])

   
    const completedStyle = {
        fontStyle: "italic",
        color: "595959",
        opacity: 0.4,
        textDecoration: "line-through",
    }
    
    //Props destructuring
    const {completed, id, title} = props.todo 

    //Variable to hold css attribute display
    let viewMode = {}
    let editMode = {}

    // Toggle hide/visibility of edit field by hiding or show
    // If editing object is true then hide the text field else hide the editing field
    if (editing) {
        viewMode.display = "none"
    } else {
        editMode.display = "none"
    }

    return (
        <li className={styles.item}>
            <div onDoubleClick={handleEditing} style={viewMode}>
                
                <input 
                    type="checkbox" 
                    className={styles.checkbox}
                    checked={completed}
                    onChange={() => props.handleChangeProps(id)} 
                /> 

                <span style={completed ? completedStyle : null}>
                    {title}
                </span>

                <button onClick={() => {props.deleteTodoProps(id)}}>
                    <FaTrash style={{color: "orangered", fontSize: "16px"}}/>
                </button>
            </div>
            <input 
                type="text" 
                style={editMode} 
                className={styles.textInput}
                value = {title}
                onChange = {(e) => {
                    props.setUpdate(e.target.value, id)
                }}

                onKeyDown = {handleUpdateDone}
            />
        </li>
    )

    
}

export default TodoItem