import {useReducer} from 'react';

const initialState = [];

function reducer(state, action) {
    switch(action.type){
        case 'Add_Task':

        default: return state;
    }
}

const Todos = () => {
    const [todos, dispatch] = useReducer(reducer, initialState);

    return(
        <>
         <h1>My Todo List ({todos.length})</h1>
         <input type="text" onBlur={() => dispatch({type: 'Add_Task'})}/>
        </>
    )
}

export default Todos;