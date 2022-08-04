import React from "react";
import styles from "./TodoItem.module.css"

class TodoItem extends React.Component {
    state = {
        editing: false,
    }

    handleEditing = () => {
        this.setState ({
            editing: true,
        })
    }

    handleUpdateDone = (event) => {
        if (event.key === "Enter") {
            this.setState({
                editing: false
            })
        }
    } 
    
    //Clean deleted data from DOM to avoid memory leak
    componentWillUnmount() {
        console.log("cleaning up...")
    } 

    render() {
        const completedStyle = {
            fontStyle: "italic",
            color: "595959",
            opacity: 0.4,
            textDecoration: "line-through",
        }
        
        //Props destructuring
        const {completed, id, title} = this.props.todo 

        //Variable to hold css attribute display
        let viewMode = {}
        let editMode = {}

        // Toggle hide/visibility of edit field by hiding or show
        // If editing object is true then hide the text field else hide the editing field
        if (this.state.editing) {
            viewMode.display = "none"
        } else {
            editMode.display = "none"
        }

        return (
            <li className={styles.item}>
                <div onDoubleClick={this.handleEditing} style={viewMode}>
                    
                    <input 
                        type="checkbox" 
                        className={styles.checkbox}
                        checked={completed}
                        onChange={() => this.props.handleChangeProps(id)} 
                    /> 

                    <span style={completed ? completedStyle : null}>
                        {title}
                    </span>

                    <button onClick={() => {this.props.deleteTodoProps(id)}}>
                        Delete
                    </button>
                </div>
                <input 
                    type="text" 
                    style={editMode} 
                    className={styles.textInput}
                    value = {title}
                    onChange = {(e) => {
                        this.props.setUpdate(e.target.value, id)
                    }}

                    onKeyDown = {this.handleUpdateDone}
                />
            </li>
        )
    }
    
}

export default TodoItem