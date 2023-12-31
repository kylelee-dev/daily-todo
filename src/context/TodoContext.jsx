import { useReducer, createContext, useContext, useRef } from "react";

const initialTodos = [
    {
        id: 1,
        text: 'Make a simple Todo',
        done: true
    },
    {
        id: 2,
        text: 'Add authentication',
        done: false
    },
    {
        id: 3,
        text: 'Retrieve Todo List from DB',
        done: false
     }
]


function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo => 
                todo.id === action.id ? {...todo, done: !todo.done} : todo
            )
        case 'REMOVE':
            return state.filter((todo => todo.id !== action.id))
        
        default: 
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {

    const [state, dispatch] = useReducer(todoReducer, initialTodos)
    const nextId = useRef(4);

    return(
    <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value ={nextId}>
                    {children}
                 </TodoNextIdContext.Provider>
        </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>)
}

export function useTodoState() {
    return useContext(TodoStateContext);
}

export function useTodoDispatch() {
    return useContext(TodoDispatchContext)
}

export function useTodoNextId() {
    return useContext(TodoNextIdContext)
}