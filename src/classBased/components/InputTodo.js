import React, {Component} from "react"

class InputTodo extends Component {
    state = {
        title: ""
    };

    onChange = (event) => {
        //The current value of the state ( the input text) is passed to title
        //using e.target.value
        this.setState ({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault ();
        if (this.state.title.trim()) {
            //Save state in a todo list 
            this.props.addTodoProps(this.state.title);
            //reset the input box
            this.setState({
                title: ""
            });
        } else {
            alert("Please write a task");
        }
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit} className="form-container">
                <input 
                    type="text" 
                    className="input-text"
                    placeholder="Add Todo..." 
                    value={this.state.title}
                    name="title"
                    onChange={this.onChange}
                />
                <button className="submit-button">Submit</button>
            </form>
        )
    }
}

export default InputTodo