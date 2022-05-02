import React,{useState} from 'react'
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import './Signup.css'


export default function Signup() {
const [userData, setuserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
})
let name,value;
    const handleChange = (e) => {
  name=e.target.name;
  value = e.target.value;
  setuserData({...userData,[name]:value})
    }

    const postData = (e)=>{
        e.preventDefault();
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`,{
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(userData)
        })
        .then(res=>res.json())
        .then((data)=>{
            alert("User registerd succesfully!!!! You may login now")
        })
        .catch((err)=>{
         alert(err.message)
        })
    }
    return (
        <>
            <div className="signup-container">
                <div className="signup-card">
                    <div className="signup-content">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <TextField id="firstName" label="FirstName" variant="outlined" style={{ width: '173px' }} name="firstName" onChange={handleChange} value={userData.firstName}/>
                            <TextField id="lastName" label="LastName" variant="outlined" style={{ width: '173px' }} name="lastName" onChange={handleChange} value={userData.lastName}/>
                        </div>
                        <TextField id="email" label="Email" variant="outlined" name="email" onChange={handleChange} value={userData.email}/>
                        <TextField id="password" label="Password" variant="outlined"
                            type="password" name="password" onChange={handleChange} value={userData.password}
                        />
                        <span className="signup-card-button" onClick={postData}>SIGNUP</span>
                    </div>
                    <div>Having an Account? <Link to="/login">
                        <span style={{
                            fontWeight: 600, color: "#000000"
                        }}>Click here to LOGIN</span>
                    </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
