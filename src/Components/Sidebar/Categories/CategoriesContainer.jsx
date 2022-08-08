import { connect } from 'react-redux';
import { getListsThunk } from '../../../redux/todo-reducer';
import Categories from './Categories'

let mapStateToProps = (state) => {
    return {
        lists: state.todoForm.lists
    }
}

const CategoriesContainer = connect(mapStateToProps, { getListsThunk })(Categories);

export default CategoriesContainer;