import React ,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';


export default function Signup() {
  let navigate=useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: ""})
    const handleSubmit = async(e)=>{
        e.preventDefault(); 
        // Fetch with header
        const response = await fetch("https://restaurant-mgmt-backend-proj.onrender.com/api/createuser",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });

        const json= await response.json();
        console.log(json);

        if(!json.success){
            alert("Enter Valid Credentials");
        }
        else 
        {
            navigate('/login');
        }

    }
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?cs=srgb&dl=pexels-ella-olsson-1640770.jpg&fm=jpg")', backgroundSize: 'cover',height: '100vh' }}>
      <div>
      <Navbar />
      </div>
    <div className='container'>
        <form  className='w-50 m-auto mt-4 border bg-dark border-success rounded' onSubmit={handleSubmit}>
            <div className="mb-3 mt-2 mx-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name='name' value={credentials.name}  onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 mt-2 mx-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3 mt-2 mx-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} aria-describedby="emailHelp" />
    
            </div>
            <div className="mb-3 mt-2 mx-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control"  name='password'  value={credentials.password} onChange={onChange} />
            </div>
            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to='/login' className='m-3 mx-1 btn btn-danger'> Already a user</Link>
          </form>
          </div>
    </div>
  )
}
