import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'

const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  //! Clear Cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  //! Remove single item
  const remove = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }
  //! Increase single item in cart
  const increase = (id) => {
    dispatch({ type: 'INCREASE_ITEM', payload: id })
  }
  //! Decrease single item in cart
  const decrease = (id) => {
    dispatch({ type: 'DECREASE_ITEM', payload: id })
  }

  const fetchData = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
  }
  const toggleAmount = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } })
  }

  useEffect(() => {
    fetchData()
  }, [])

  //! We do not setup a new function instead we will use useEffect
  //! Everytime our value in state changes we would want to call that useEffect
  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' })
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
