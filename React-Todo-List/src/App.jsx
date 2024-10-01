import {useReducer, useState} from 'react';

const initialState = [];

function reducer(state, action) {
    switch(action.type){
        case 'Add_Task': return [
            
            {
                id:state.length +1,
                name: action.payload,
                completed: false
            },
            ...state,
        ];
        case 'Toggle_Complete':
            return state.map(task =>
                task.id === action.payload ? {...task, completed: !task.completed }  : task
            );

        case 'Delete_Task': 
            return state.filter(d => d.id !==action.payload)

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

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleAddTask();
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
            onKeyUp={handleKeyPress}
        /> 
        <button onClick={handleAddTask}>Add</button>
        
        <ul style={{ listStyleType: 'none', padding: 0 }}>
           {todos.map(todo => (
           <li key={todo.id}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                    // console.log('Toggle Task Complete', todo.id);
                    dispatch({ type: 'Toggle_Complete', payload: todo.id });
                }}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.name}
            </span>
            <span>
                <button onClick={() => todo.completed && dispatch(
                    { type: 'Delete_Task', payload:todo.id})} disabled={!todo.completed}>
                    Delete
                </button>
            </span>
           </li>))}
           </ul>
        </div>
    )
}

export default Todos;