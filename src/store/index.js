import { createContext, useContext, useMemo, useReducer } from "react";



const MyContext = createContext()
MyContext.displayName = "My store"

const reducer = (state, action) => {
  switch (action.type){
    case "USER_LOGIN":
      return {
        ...state,
        userLogin: 
        action.value
      }
    case "LOGOUT":
      return {
        ...state, 
        userLogin: null
      }
    default:{
      throw new Error("Action không tồn tại.")
    }
  }
}

const MyContextControllerProvider = ({children}) => {
  const initialState = {
    userLogin: null,
    jobs: []
  }
  const [controller, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => [controller, dispatch])
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  )
}

const useMyContextProvider = () => {
  const context = useContext(MyContext)
  if (!context){
    return new Error("useMyContextProvider phai dat trong MyContextControllerProvider")
  }
  return context;
}

export { MyContextControllerProvider, useMyContextProvider };
