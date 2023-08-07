import React, { useEffect, createContext, useReducer, useContext } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Login from './components/screens/Login';
import SignUp from './components/screens/SignUp';
import CreateNote from './components/screens/CreateNote';
import MyNotes from './components/screens/MyNotes';
import { reducer, initialState } from './reducers/userReducer';

export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
    } else
      navigate('/')
  }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/createnote' element={<CreateNote />} />
        <Route path='/mynotes' element={<MyNotes />} />
      </Routes>
    </>
  )
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <NavBar />
        <Routing />


      </UserContext.Provider>
    </>
  );
}

export default App;
