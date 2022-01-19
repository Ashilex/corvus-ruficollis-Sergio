import { createSelector } from 'reselect'

export const selectItems = (state) => state.items;
export const selectTipPercentage = (state) => state.tipPercentage;
export const selectItem = (state, uuid) => {
  const items = state.items
  for ( const item of items) {
    if (item.uuid == uuid) {
      return item
    }
  }
}

export const selectItemTotal = createSelector(
  [selectItem],
    (item) => {
      return item.price * item.quantity
    }
);

export const selectSubtotal = createSelector(
  [selectItems],
    (items) => {
      return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    });

export const selectTipAmount = createSelector([selectSubtotal, selectTipPercentage],
  (subtotal, tipPercentage) => {
    return subtotal * (tipPercentage / 100);
  });

export const selectTotal = createSelector([selectSubtotal, selectTipAmount], (subtotal, tipAmount) => subtotal+tipAmount);


