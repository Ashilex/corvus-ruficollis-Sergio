import newItemForm, { NewItemForm } from '../components/NewItemForm'
import { connect } from 'react-redux';
import { addNewItem } from '../store/items/actions';

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (name,price)=>{dispatch(addNewItem(name,price))}
  }
}

export const NewItemFormContainer = connect(null,mapDispatchToProps)(NewItemForm)
