import {useReducer, useState} from 'react';

const initialState = [];

function reducer(state, action) {
    switch(action.type){
        case 'Add_Task': return [
            ...state,
            {
                id:state.length +1,
                name: action.payload
            }
        ];

        case 'Delete_Task': return state.filter(d => d.id !==action.payload)

        default: return state;
    }
}

const Todos = () => {
    const [todos, dispatch] = useReducer(reducer, initialState);
    const [task, setTask] = useState('');

    const handleAddTask = () => {
        if(task.trim()) {
            dispatch({ type: 'Add_Task', payload: task});
            setTask('');
        }
    };

    return(
        <div style = {{ textAlign: "center"}}>
         <h1>My Todo List ({todos.length})</h1>
        Add New Task:
         <input 
            type="text"
            value={task} 
            onChange={(e) => setTask(e.target.value)}
        /> 
        <button onClick={handleAddTask}>Add</button>

           {todos.map(todo => <li key={todo.id}>{todo.name}
            <span>
                <button onClick={() => dispatch(
                    { type: 'Delete_Task', payload:todo.id})}>
                    Delete
                </button>
            </span>
           </li>)}
        </div>
    )
}

export default Todos;