import React, { useState } from 'react'
import MyNotes from './MyNotes'

export default function CreateNote() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const postDetail = () => {
        fetch("/api/note/createnote", {
            method: "post",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title,
                description
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    alert(data.error)
                }
            })
        window.location.reload(true)
    }


    return (
        <>
            <div className='container w-50 mt-5'>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                    <button type="button" className="btn btn-primary" onClick={() => postDetail()}>submit</button>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <MyNotes className='col-md-2' />
                </div>
            </div>
        </>
    )
}
