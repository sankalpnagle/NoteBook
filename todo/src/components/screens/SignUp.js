import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/api/user/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: inputs.name,
                email: inputs.email,
                password: inputs.password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    navigate('/')
                    alert(data.message)
                }
            })
            .catch(error => { console.log(error) })
    }

    return (
        <>
            <div className='back'>
                <div className='signupcustombox custombox'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-control" value={inputs.name} name='name' onChange={handleChange} />
                        </div>
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

        </>
    )
}
