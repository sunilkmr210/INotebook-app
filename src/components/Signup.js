import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({name:"", email:"", password:"", confirmPass:""});

  const onSubmit = async ()=>{
    e.preventDefault();
    const {name, email, password, confirmPass} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'token': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmFhZDFmM2I4NWU4ZGZjN2NlMGQzYiIsImlhdCI6MTY5NDE3MjgxM30.DyLxvOX8UacSTh-YWJeyEeQnkTKtvTF2kuE7VqHdqLk'
            },
            body: JSON.stringify({name, email, password})
          });
          const json = await response.json();
          if(json.success){
            navigate.push('/');
          }
          else{
            alert("Invalid credentials");
          }
  }

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="password" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} onChange={onChange} minLength={5} required id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="email" className="form-text" name="email">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} minLength={5} required id="password" name="password"/>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPass" className="form-label">ConfirmPassword</label>
          <input type="password" className="form-control" value={credentials.confirmPass} onChange={onChange} minLength={5} required id="confirmPass" name="confirmPass"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
