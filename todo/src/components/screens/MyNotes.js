import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import '../../style.css'

export default function MyNotes() {
    const [note, setNotes] = useState([])
    const [data, setdata] = useState([])
    const [updatenote, setUpdateNote] = useState({})
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    })
    // const [checkbox, setCheckbox] = useState([]);
    const getNotes = () => {
        const id = localStorage.getItem('user')
        fetch(`/api/note/notes/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.notes)
                setNotes(data.notes)
            })
    }

    useEffect(() => {
        getNotes()
        // HandleEdit()
    }, [])


    const deleteHandle = (postid) => {
        fetch(`/api/note/delete/${postid}`, {
            method: "delete",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setdata(newData)
            })
        window.location.reload(false);
    }

    const handleActiveCheckbox = (id, completed) => {
        fetch(`/api/note/active/${id}`, {
            method: "put",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setdata(newData)
                window.location.reload(false)
            })
    }
    const handleUnactiveCheckbox = (id, completed) => {
        fetch(`/api/note/unactive/${id}`, {
            method: "put",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setdata(newData)
                window.location.reload(false)
            })
    }

    const navigate = useNavigate();
    const HandleEdit = (postid, title, description) => {
        // console.log(postid);
        ref.current.click()
        {

            fetch(`/api/note/getnote/${postid}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data.title)
                    localStorage.setItem("noteId", data._id)
                    setUpdateNote({
                        title: data.title,
                        description: data.description
                    })
                    // setNotes(data.notes)
                })
        }

    }


    const handleChange = (e) => {
        e.preventDefault()
        setUpdateNote((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const id = (localStorage.getItem("noteId"))
        console.log(id);
        console.log(updatenote);
        await fetch(`/api/note/update/${id}`, {
            method: "put",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title: updatenote.title,
                description: updatenote.description
            })
        }).then(res => {
            res.json()
            console.log(res)
        }).then(data => {
            console.log(data);
            window.location.reload(false)
            navigate('/createnote')

        })
        console.log([data]);
    }

    const ref = useRef(null)

    return (
        <>
            <button ref={ref} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form >
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" name='title' value={updatenote.title} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows="3" name='description' value={updatenote.description} onChange={handleChange}></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container my-3'>
                <div className='container '>
                    {note.map(ob => <div key={ob._id} className="alert alert container w-75 customcard" role="alert" >
                        <div className='card-body'>
                            <div className='d-flex justify-content-between'>
                                <div>{ob.title}</div>
                                <div>{ob.description}</div>
                                <div className="d-flex">
                                    <div className='ps-4'>  <button style={{ background: "none", border: "none" }} onClick={() => HandleEdit(ob._id, ob.title, ob.description)}><FontAwesomeIcon icon={faPen} /></button></div>
                                    <div className='ps-4'>  <button style={{ background: "none", border: "none" }} onClick={() => deleteHandle(ob._id)}> <FontAwesomeIcon icon={faTrash} /></button></div>
                                    <div className="form-check">
                                        {!ob.completed ? <button className="btn btn-success" type="button" value="" onClick={() => handleActiveCheckbox(ob._id, ob.completed)}> Active </button>
                                            : <button className="btn btn-danger" type="button" value="" onClick={() => handleUnactiveCheckbox(ob._id, ob.completed)}> Unactive </button>}


                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>)}
                </div>
            </div>



        </>
    )
}


{/* <div key={ob._id} className="card m-3" style={{ width: "18rem" }}>
    <div className="card-body">
        <h5 className="card-title">{ob.title}</h5>
        <div className='d-flex align-item-center'></div>
        <p className="card-text">{ob.description}</p>
        <div className="d-flex justify-content-end">
            <div className=''>  <button style={{ background: "none", border: "none" }} onClick={() => HandleEdit(ob._id)}><FontAwesomeIcon icon={faPen} /></button></div>
            <div className='ms-4'>  <button style={{ background: "none", border: "none" }} onClick={() => deleteHandle(ob._id)}> <FontAwesomeIcon icon={faTrash} /></button></div>
            <div className="form-check">
                <input className="form-check-input ms-1" type="checkbox" value="" id="flexCheckIndeterminate"
                    onClick={() => handleCheckbox(ob._id, ob.completed)} />
                {/* {ob._id} */}
//             </div >
//         </div >
//     </div >
// </div > * /}