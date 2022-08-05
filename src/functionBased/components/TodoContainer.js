import React, {useState, useEffect} from "react"
import { v4 as uuidv4 } from "uuid"
import TodosList from "./TodosList"
import InputTodo from "./InputTodo"
import Header from "./Header"

const TodoContainer = () => {
    const [todos, setTodos] = useState([])

    //Event handler used to detect changes in child component
    const handleChange = (id) => {
        setTodos (prevState => 
            prevState.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo, 
                        completed: !todo.completed,
                    }
                }
                return todo   
            })
        )
    }

    //Delete to do list handler
    const delTodo = (id) => {
        setTodos (
            /*Manipulate the current todos array by filtering out the 
             id of the todo task that was deleted*/
            [
               ...todos.filter(todo => {
                   return todo.id !== id;
               }) 
            ]

        )
    }

    const addTodoItem = (title) => {
        const newTodo = {
            id: uuidv4(),
            title: title,
            completed: false
        };
        setTodos(
            [...todos, newTodo]
        );
    }

    const setUpdate = (updatedTitle, id) => {
        setTodos (
            todos.map(todo => {
                if (todo.id === id) {
                    todo.title = updatedTitle
                }
                //return the modified todo list
                return todo
            }),
        )
    }
    
   //get data from localstorage
    useEffect (() => {
        const temp = localStorage.getItem("todos")
        const loadedTodos = JSON.parse(temp)

        if (loadedTodos) {
            setTodos(loadedTodos)
        }
    }, [setTodos]);
    
    //Update on the state change
    useEffect(() => {
        /*// storing todos items
        fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
        .then(response => response.json())
        .then(data => setTodos(data));*/

        if (todos.length !== 0) {
            const temp = JSON.stringify(todos)
            localStorage.setItem("todos", temp)
           
        }
        
    }, [todos])

        return (

            <div className="container">
                <div className="inner">
                    <Header />
                    <InputTodo addTodoProps={addTodoItem}/>
                    <TodosList 
                        todos={todos} 
                        handleChangeProps={handleChange}
                        deleteTodoProps={delTodo}
                        setUpdate={setUpdate}
                    />
                </div>
            </div> 
    
        );
    
}

export default TodoContainer 