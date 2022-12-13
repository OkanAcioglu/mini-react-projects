//! setup function export it and grab it into the context

const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }
  if (action.type === 'REMOVE_ITEM') {
    const newCart = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: newCart }
  }
  if (action.type === 'INCREASE_ITEM') {
    let tempCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 }
      }
      return item
    })
    return { ...state, cart: tempCart }
  }

  return state
}
export default reducer

//! Some people prefer to use switch statement...
