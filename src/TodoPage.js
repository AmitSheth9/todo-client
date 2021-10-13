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
    handleRemove = async e => {
        
    }
    
    render() {
        console.log(this.props.token);
        console.log(this.state);
        return (
            <div><br/>
                <div className='title'>
                    TODO LIST
                </div>
                <form className = 'todoform' onSubmit={this.handleSubmit}>
                    <label>Enter a ToDo list item:<input className='todoinput' onChange={e => this.setState({ todoItem: e.target.value})}/></label>
                    <button className='todobutton'>Submit</button>
                </form>
                <ol className = 'todosdiv'>
                    {this.state.todos.map(todo => 
                    
                <li key={`${todo.id}`} onClick={async() => {
                    await updateTodo(todo.id, !todo.completed, this.props.token)
                    const todos = await getTodos(this.props.token)
                    this.setState({todos: todos})
                }}
                className = {todo.completed ? 'todoitem completed' : 'todoitem todo'}>{todo.todo} {todo.completed ? <p className='status-completed'>Completed</p> : '' }
                <button className='removetodo' onClick={this.handleRemove}>Remove</button></li>)}
                </ol>
            </div>
        )
    }
}
