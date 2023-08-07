import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import { reducer } from '../reducers/userReducer'

export default function NavBar() {
    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate()
    // window.location.reload();
    const renderList = () => {
        if (state) {
            return [
                <>
                    <li>
                        <Link className="nav-link" to={"/createnote"}>Notes</Link>
                    </li>
                    <button className="btn btn-danger mx-3" type="submit" name='action' onClick={() => {
                        localStorage.clear()
                        dispatch({ type: "CLEAR" })
                        navigate('/')
                    }}>Log Out</button>

                </>
            ]
        } else {
            return [
                <>
                    <Link to={"/"}>  <button className="btn btn-primary" type="submit">Login</button></Link>
                    <Link to={"/signup"}> <button className="btn btn-danger mx-3" type="submit">Register</button></Link>

                </>
            ]
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg    bg-dark navbar-dark">
                <div className="container-fluid ">
                    <Link to={state ? "/createnote" : "/"} className="navbar-brand">NoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">

                            {/* <li className="nav-item">
                                <Link className="nav-link " to={"/mynotes"}>My Notes</Link>
                            </li> */}
                        </ul>
                        <form className="d-flex" role="search">
                            {renderList()}
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}
