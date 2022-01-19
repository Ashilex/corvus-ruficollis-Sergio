import { ITEM_ADDED, ITEM_PRICE_UPDATED, ITEM_QUANTITY_UPDATED, ITEM_REMOVED } from './actions';
import produce from 'immer';


let id = 1;

export const initialItems = [
  { uuid: id++, name: 'Tofu Roast', price: 14, quantity: 1 },
  { uuid: id++, name: 'Vegan Ham', price: 12, quantity: 1 }
];

export const reducer = (state = initialItems, action) => {
  if (action.type === ITEM_ADDED) {
    const item = { uuid: id++, quantity: 1, ...action.payload};
    return [...state, item]
  }

  if (action.type === ITEM_REMOVED ) {
    return state.filter(e=>e.uuid !== action.payload.uuid)
  }

  if(action.type === ITEM_PRICE_UPDATED) {
    return state.map( item => {
      if(item.uuid === action.payload.uuid) {
        return { ...item, price:action.payload.price};
      }
      return item;
    })
  }
  //
  // if(action.type === ITEM_QUANTITY_UPDATED) {
  //   return state.map( item => {
  //     if(item.uuid === action.payload.uuid) {
  //       return { ...item, quantity:action.payload.quantity};
  //     }
  //     return item;
  //   })
  // }

  if(action.type === ITEM_QUANTITY_UPDATED) {
    return   produce(state, draftState => {
      const item = draftState.find( f => f.uuid == action.payload.uuid)
      item.quantity = action.payload.quantity
    })
  }

  return state;
};

export default reducer;
