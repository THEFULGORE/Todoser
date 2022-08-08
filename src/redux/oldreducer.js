const ADD_TODO = 'todoForm/addTodo';
const UPDATE_NEW_TEXT = 'todoForm/updateNewText';
const REMOVE_TODO = 'todoForm/removeTodo';
const UPDATE_CUR_TEXT = 'todoForm/updateCurText';
const COMPLETE_TODO = 'todoForm/completeTodo';
const GET_LISTS = 'categories/getLists';

let initialState = {
    todoData: [
        { id: 1, text: "walk out", completed: false }
    ],
    newText: '',
    lists: []
}

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LISTS: {
            return { ...state, lists: [...action.payload] }
        }
        case ADD_TODO: {
            let newTodo = {
                id: Math.floor(Math.random() * 10000),
                text: state.newText
            }
            if (state.newText !== '') {
                return {
                    todoData: [...state.todoData, newTodo],
                    newText: '',
                }
            }
            else return state;
        }
        case UPDATE_NEW_TEXT: {
            return { ...state, newText: action.newText }
        }
        case REMOVE_TODO: {
            const removedArray = [...state.todoData].filter(item => (item.id !== action.id));
            return { todoData: removedArray }
        }
        case UPDATE_CUR_TEXT: {
            const updatedArray = [...state.todoData].map(item => {
                return action.id === item.id ? { ...item, text: action.text } : item
            })
            return { todoData: updatedArray }
        }
        case COMPLETE_TODO: {
            const updatedArray = [...state.todoData].map(item => {
                return action.id === item.id ? { ...item, completed: !item.completed } : item
            })
            return { todoData: updatedArray }
        }
        default:
            return state;
    }
}

export const addTodoActionCreator = () => ({ type: ADD_TODO });
export const updateNewText = (text) => ({ type: UPDATE_NEW_TEXT, newText: text });
export const updateCurText = (text, id) => ({ type: UPDATE_CUR_TEXT, text, id });
export const removeTodo = (id) => ({ type: REMOVE_TODO, id });
export const completeTodo = (id) => ({ type: COMPLETE_TODO, id });

export const getLists = () => ({ type: GET_LISTS, payload });
export const getListsThunk = () =

export default todoReducer