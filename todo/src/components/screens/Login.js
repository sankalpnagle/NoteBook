import '../../style.css'
import React, { useEffect, useState, useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App';

export default function Login() {
    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })
    const handleChange = (e) => {
        setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/api/user/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: inputs.email,
                password: inputs.password
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    alert(data.error)
                } else {
                    localStorage.setItem("jwt", data.token)
                    // localStorage.setItem("userId", JSON.stringify(data.user.id))
                    localStorage.setItem("user", JSON.stringify(data.user.id))
                    dispatch({ type: "USER", paload: data.user })
                    navigate('/createnote')
                    alert(data.message)
                }
            })
            .catch(error => { console.log(error) })
    }


    return (
        <>
            <div className='back'>
                <div className='logincustomcard custombox'>
                    <div className=''>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control" value={inputs.email} name='email' onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" value={inputs.password} name='password' onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
