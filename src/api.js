import { db, auth, provider } from "./firebase";
import { collection, getDocs, addDoc, getDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { setUserAC } from "./redux/todo-reducer";

export const initAuth = () => {
    onAuthStateChanged(auth, (user) => {
        if(user){
            return user;
        } else {
            alert('no user')
        }
    });
}

export const loginUser = () => {
    return signInWithPopup(auth, provider)
        .then((result) => {
            const user = {
                name: result.user.displayName,
                photo: result.user.photoURL
            };

            return user;
        }).catch((error) => {
            console.log(error)
        });
}

export const signOutUser = () => {
    return signOut(auth)
        .then(() => {})
        .catch((error) => {
            console.log(error)
        })
}
//DB
export const getLists = () => {
    const colRef = collection(db, "lists");
    return getDocs(colRef)
        .then((snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return items;
        })
}

export const getTodos = () => {
    const colRef = collection(db, "todos");
    return getDocs(colRef)
        .then((snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return items;
        })
}

export const getListTodos = (listId) => {
    const colRef = collection(db, "todos");
    return getDocs(colRef)
        .then((snapshot) => {
            const items = snapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                .filter(el => el.listId === listId)

            return items;
            // const newItems = items.filter(el => el.listId === listId)
            // return newItems;
        });
}

export const createTodo = (listId, text) => {
    const colRef = collection(db, "todos");
    return addDoc(colRef, {
        completed: false,
        listId: listId,
        text: text
    }).then(docRef => getDoc(docRef))
        .then(doc => ({
            id: doc.id,
            ...doc.data()
        }));
}

export const deleteTodo = (todoId) => {
    const colRef = doc(db, "todos", todoId);
    return deleteDoc(colRef).then(() => todoId)
}

export const completeTodo = (todoId, comp) => {
    const colRef = doc(db, "todos", todoId);
    return updateDoc(colRef, { completed: !comp })
        .then(() => todoId);
}

export const updateTodoText = (todoId, text) => {
    const colRef = doc(db, "todos", todoId);
    return updateDoc(colRef, { text: text })
        .then(() => todoId);
}

export const createList = (text) => {
    const colRef = collection(db, "lists");
    return addDoc(colRef, {
        title: text
    }).then(docRef => getDoc(docRef))
        .then(doc => ({
            id: doc.id,
            ...doc.data()
        }));
}