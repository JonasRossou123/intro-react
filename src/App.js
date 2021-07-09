import Header from './components/Header'
import {useState, useRef, useEffect} from "react";
import TodoList from './components/TodoList'
import { v4 as uuidv4 } from 'uuid';


const LOCAL_STORAGE_KEY = 'todoApp.todos'

const App = () => {

    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()

    useEffect (()=>{
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos (storedTodos)
    },[])

    useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleTodo(id){
        const newTodos = [...todos]
        const todo = newTodos.find(todo=>todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    function deleteTodo(id){
        const newTodos = [...todos]
        const todo = newTodos.findIndex(todo=>todo.id === id)
        newTodos.splice(todo,1)
        setTodos(newTodos)
    }

    function handleAddTodo(){
        const name = todoNameRef.current.value
        if (name === '') return
        setTodos(prevTodos => {
            return [...prevTodos, {id: uuidv4(), name: name, complete:false }]
        })
        todoNameRef.current.value = null
    }

    function handleKeyDown (event){
        if (event.key === 'Enter') {
        const name = todoNameRef.current.value
        if (name === '') return
        setTodos(prevTodos => {
            return [...prevTodos, {id: uuidv4(), name: name, complete:false }]
        })
        todoNameRef.current.value = null}
    }

    function handeleClearTodos(){
        const newTodos = todos.filter (todo=>!todo.complete)
        setTodos(newTodos)
    }

    return (
        <div className="container">
            <div className="row text-center p-4">
                    <Header className="col-12 shadow" />
            </div>

            <div className="row mx-auto justify-content-center text-center">
                <input className="col-md-3 col-sm-7 inputfield rounded shadow mb-2" ref={todoNameRef} type="text" onKeyDown={handleKeyDown}/>
                <button className="col-md-2 col-sm-6 mx-2 btn btn-pill btn-success btnadd shadow mb-2" onClick={handleAddTodo}>Add To Do</button>
            </div>

            <div className="row mt-5">
                <div className="col-md-5 col-sm-8 border rounded mx-auto minima shadow mb-3">
                    <span className="m-2 h3 d-block">Not completed</span>
                    <TodoList toggleTodo={toggleTodo} deleteTodo={deleteTodo} todos={todos.filter(todos=>!todos.complete)} />
                    <span className="field1"> <div className="d-inline">{todos.filter(todo => !todo.complete).length} </div> {todos.filter(todo => !todo.complete).length === 1 ? ' to-do left' : ' to-dos left'}  </span>
                </div>

                <div className="col-md-5 col-sm-8 border rounded mx-auto minima shadow mb-3">
                    <span className="m-1 h3 d-block">Completed</span>
                    <TodoList toggleTodo={toggleTodo} deleteTodo={deleteTodo} todos={todos.filter(todos=>todos.complete)}/>
                    <button className="field2 btn btn-pill btn-warning btnclear shadow" onClick={handeleClearTodos}>Clear Complete</button>
                </div>
            </div>

            <div className="clock">
                <div className="top"></div>
                <div className="right"></div>
                <div className="bottom"></div>
                <div className="left"></div>
                <div className="center"></div>
                <div className="hour"></div>
                <div className="minute"></div>
                <div className="second"></div>
            </div>

        </div>




  );
}

export default App;