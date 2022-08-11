import { Route, Routes } from 'react-router-dom';
import './App.scss';
import TodoFormContainer from './Components/TodoFormContainer';
import Sidebar from './Components/Sidebar/Sidebar';
import InfoPanel from './Components/InfoPanel/InfoPanel';
import { connect } from 'react-redux';
import { getListsThunk, getTodosThunk, setUserAC } from './redux/todo-reducer';
import { useEffect } from 'react';
import Login from './Components/Login/Login';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App(props) {
	useEffect(() => {
		props.getTodos();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const userinfo = { name: user.displayName, photo: user.photoURL };
				console.log(userinfo);
				props.setUser(userinfo);
			}
		});
		console.log(props.user);
	}, []);

	useEffect(() => {
		props.getLists();
	}, [props.lists]);

	return (
		<div className="app-wrapper">
			<Sidebar />
			<div>
				<Routes>
					<Route path="/" element={<TodoFormContainer />} />
					<Route path="/:path/*" element={<TodoFormContainer />} />
					<Route path="/login/*" element={<Login />} />
				</Routes>
			</div>
			<InfoPanel />
		</div>
	);
}

let mapStateToProps = (state) => {
	return {
		lists: state.todoForm.lists,
		user: state.todoForm.user,
		isAuth: state.todoForm.isAuth,
	};
};

let mapDispatchToProps = (dispatch) => {
	return {
		getTodos: () => {
			dispatch(getTodosThunk());
		},
		getLists: () => {
			dispatch(getListsThunk());
		},
		setUser: (user) => {
			dispatch(setUserAC(user));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
