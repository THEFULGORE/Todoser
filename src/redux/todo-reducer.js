import * as api from '../api';

const ADD_TODO = 'todoForm/addTodo';
const UPDATE_NEW_TEXT = 'todoForm/updateNewText';
const DELETE_TODO = 'todoForm/deleteTodo';
const UPDATE_CUR_TEXT = 'todoForm/updateCurText';
const COMPLETE_TODO = 'todoForm/completeTodo';
const GET_LISTS = 'categories/getLists';
const GET_TODOS = 'todoFormContainer/getTodos';
const GET_LIST_TODOS = 'todoFormContainer/getListTodos';
const CREATE_LIST = 'categories/createList';
const SET_USER = 'api/setUser';
const LOGOUT_USER = 'api/logout';

let initialState = {
	todoData: [],
	newText: '',
	lists: [],
	user: [],
	isAuth: undefined,
};

export const todoReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER: {
			return {
				...state,
				user: { name: action.user.name, photo: action.user.photo },
				isAuth: true,
			};
		}
		case LOGOUT_USER: {
			return {
				...state,
				user: [],
				isAuth: false,
			};
		}
		case GET_LISTS: {
			return {
				...state,
				lists: action.lists,
			};
		}
		case GET_TODOS: {
			return {
				...state,
				todoData: action.todos,
			};
		}
		case GET_LIST_TODOS: {
			return {
				...state,
				todoData: action.todos,
			};
		}
		case ADD_TODO: {
			return {
				...state,
				todoData: [...state.todoData, action.todos],
				newText: '',
			};
		}
		case CREATE_LIST: {
			return {
				...state,
				lists: [...state.lists, action.list],
			};
		}
		case UPDATE_NEW_TEXT: {
			return { ...state, newText: action.newText };
		}
		case DELETE_TODO: {
			return {
				...state,
				todoData: state.todoData.filter((todo) => todo.id !== action.id),
			};
		}
		case UPDATE_CUR_TEXT: {
			const updatedArray = [...state.todoData].map((item) => {
				return action.id === item.id ? { ...item, text: action.text } : item;
			});
			return {
				...state,
				todoData: updatedArray,
			};
		}
		case COMPLETE_TODO: {
			const updatedArray = [...state.todoData].map((el) => {
				return action.id === el.id ? { ...el, completed: !el.completed } : el;
			});
			return {
				...state,
				todoData: updatedArray,
			};
		}
		default:
			return state;
	}
};

export const setUserAC = (user) => ({ type: SET_USER, user });
export const loginUserThunk = () => async (dispatch) => {
	let res = await api.loginUser();
	dispatch(setUserAC(res));
};

const signOutAC = () => ({ type: LOGOUT_USER });
export const signOutUserThunk = () => async (dispatch) => {
	let res = await api.signOutUser();
	dispatch(signOutAC());
};

export const updateNewText = (text) => ({ type: UPDATE_NEW_TEXT, newText: text });
const completeTodoAC = (id) => ({ type: COMPLETE_TODO, id });
export const completeTodoThunk = (todoId, comp) => async (dispatch) => {
	let res = await api.completeTodo(todoId, comp);
	dispatch(completeTodoAC(todoId));
};

const deleteTodoAC = (id) => ({ type: DELETE_TODO, id });
export const deleteTodoThunk = (todoId) => async (dispatch) => {
	let res = await api.deleteTodo(todoId);
	dispatch(deleteTodoAC(res));
};

const addTodoAC = (data) => ({ type: ADD_TODO, todos: data });
export const addTodoThunk = (listId, newText) => async (dispatch) => {
	if (newText) {
		let res = await api.createTodo(listId, newText);
		dispatch(addTodoAC(res));
	}
};

const addListAC = (data) => ({ type: CREATE_LIST, list: data });
export const addListThunk = (text) => async (dispatch) => {
	let res = await api.createList(text);
	dispatch(addListAC(res));
};

const getListsAC = (data) => ({ type: GET_LISTS, lists: data });
export const getListsThunk = () => async (dispatch) => {
	let res = await api.getLists();
	dispatch(getListsAC(res));
};

const getTodosAC = (array) => ({ type: GET_TODOS, todos: array });
export const getTodosThunk = () => async (dispatch) => {
	let res = await api.getTodos();
	dispatch(getTodosAC(res));
};

const getListTodosAC = (array) => ({ type: GET_LIST_TODOS, todos: array });
export const getListTodosThunk = (listId, comp) => async (dispatch) => {
	let res = await api.getListTodos(listId, comp);
	dispatch(getListTodosAC(res));
};

const updateCurTextAC = (id, text) => ({ type: UPDATE_CUR_TEXT, id, text });
export const updateCurTextThunk = (todoId, text) => async (dispatch) => {
	let res = await api.updateTodoText(todoId, text);
	dispatch(updateCurTextAC(todoId, text));
};

export default todoReducer;
