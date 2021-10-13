import React, { Component } from 'react'
import { createTodo, getTodos, updateTodo } from './fetch-utils'

export default class TodoPage extends Component {
    state = {
        todos: [],
        todoItem: ''
    }

    componentDidMount = async() => {
        const todos = await getTodos(this.props.token)
        this.setState({ todos: todos})
    }
    handleSubmit = async e => {
        e.preventDefault();
        await createTodo(this.state.todoItem, this.props.token)

        const todos = await getTodos(this.props.token)
        this.setState({ todos: todos, todoItem: ''})
        
    }
    
    render() {
        console.log(this.props.token);
        console.log(this.state);
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Add a ToDo:<input onChange={e => this.setState({ todoItem: e.target.value})}/></label>
                    <button>Submit</button>
                </form>
                <div>
                    {this.state.todos.map(todo => 
                    
                <div key={`${todo.id}`} onClick={async() => {
                    await updateTodo(todo.id, !todo.completed, this.props.token)
        const todos = await getTodos(this.props.token)
        this.setState({todos: todos})
                }}
                >{todo.todo}</div>)}
                </div>
            </div>
        )
    }
}
