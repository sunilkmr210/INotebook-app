import React,{ useState }  from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({email:"", password:""});

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'token': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmFhZDFmM2I4NWU4ZGZjN2NlMGQzYiIsImlhdCI6MTY5NDE3MjgxM30.DyLxvOX8UacSTh-YWJeyEeQnkTKtvTF2kuE7VqHdqLk'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json = await response.json();
          if(json.success){
            localStorage.setItem('token', json.token);
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
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
