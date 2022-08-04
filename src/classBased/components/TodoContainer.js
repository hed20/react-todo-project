import React from "react"
import { v4 as uuidv4 } from "uuid"
import TodosList from "./TodosList"
import InputTodo from "./InputTodo"
import Header from "./Header"


class TodoContainer extends React.Component {
    state = {
        todos: [
     
        ]
    }

    //Event handler used to detect changes in child component
    handleChange = (id) => {
        this.setState (prevState => ({
            todos: prevState.todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo, 
                        completed: !todo.completed,
                    }
                }
                return todo   
            })
        }))
    }

    //Delete to do list handler
    delTodo = (id) => {
        this.setState ({
            /*Manipulate the current todos array by filtering out the 
             id of the todo task that was deleted*/
            todos: [
               ...this.state.todos.filter(todo => {
                   return todo.id !== id;
               }) 
            ]

        })
        //Delete cleared task and remove it from todo list in the API
        fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
            method: 'DELETE',
        })
        .then(res => console.log(res))

    }

    addTodoItem = (title) => {
        const newTodo = {
            id: uuidv4(),
            title: title,
            completed: false
        };
        this.setState({
            todos: [...this.state.todos, newTodo]
        });
    }

    setUpdate = (updatedTitle, id) => {
        this.setState ({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.title = updatedTitle
                }
                //return the modified todo list
                return todo
            }),
        })
    }

    //Mounting function to fetch api data of todos in a lifecycle method.
    componentDidMount() {
        
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then(response => response.json())
        .then(data => this.setState({todos: data }));
        const temp = localStorage.getItem("todos")
        const loadedTodos = JSON.parse(temp);
        if (loadedTodos) {
            this.setState({
                todos: loadedTodos
            })
        }
    }

    //Update the todo list and save data to localstorage 
    componentDidUpdate (prevProps, prevState) {
        if (prevState.todos !== this.state.todos) {
            const temp = JSON.stringify(this.state.todos)
            localStorage.setItem("todos", temp)
        }

    }

    render() {
    
        return (
            <div className="container">
                <div className="inner">
                    <Header />
                    <InputTodo addTodoProps={this.addTodoItem}/>
                    <TodosList 
                        todos={this.state.todos} 
                        handleChangeProps={this.handleChange}
                        deleteTodoProps={this.delTodo}
                        setUpdate={this.setUpdate}
                    />
                </div>
            </div>  
        );
    }
}

export default TodoContainer 