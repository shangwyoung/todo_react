import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo'
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo} from './lib/todoHelpers'
import {pipe, partial} from './lib/utils'

class App extends Component {
  // property intializer syntax in ES6 classes
  // state is an instance property of this class
  // Available as this.state
  state = {
    todos: [
      {id: 1, name: 'Learn JSX', isComplete: true},
      {id: 2, name: 'Build React App', isComplete: false},
      {id: 3, name: 'Ship it!', isComplete: false}
    ],
    currentTodo: ''
  }

  // compose dynamic content, we need state
  // In order for handleInputChange to change our state, we need to reference
  // it in our constructor and bind it to 'this'.
  // This ensures that when we call this.setState, 'this' refers to the
  // correct context. This can also be accomplished by using the arrow function
  // syntax for functions, that automatically pass in 'this'
  // Thus, we don't need a custom constructor

  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
    const updatedTodos = getUpdatedTodos(id, this.state.todos)
    this.setState({todos: updatedTodos})
  }

  handleSubmit = (e) => {
    e.preventDefault(); // prevent the form to submit through GET
    const newId = generateId()
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false}
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    })
  }
  handleEmptySubmit = (e) => {
    e.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }
  handleRemove = (id, e) => {
    e.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({
      todos: updatedTodos
    })
  }
  // In order for the input to update our state, we need an event handler
  // To change our state, we need to use the setState() method, by giving it
  // an object, with key value pairs that we want to update
  // We then set it has a handler for the onChange event of our input
  // This makes our view is a function of our state, to keep view in sync with
  // our data
  handleInputChange = (e) => {
    this.setState({
      currentTodo: e.target.value
    })
  }
  render() {
    // if currentTodo is truthy, use handleSubmit, o.w. use handleEmptySubmit
    const sumbitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
          <TodoForm handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={sumbitHandler}/>
          <TodoList
            handleToggle={this.handleToggle}
            todos={this.state.todos}
            handleRemove={this.handleRemove}/>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
