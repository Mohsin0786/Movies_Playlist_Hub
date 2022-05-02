import React,{useState} from 'react'
import './Login.css'
import { Link,useNavigate } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
export default function Login() {
    let navigate = useNavigate();
    const [userData, setuserData] = useState({
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
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signin`,{
              method: 'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify(userData)
            })
            .then((res)=>{
                if(res.status===401){
                    throw Error(res.statusText)
                }
                return res.json()
            })
            .then((data)=>{
            if(data.statusCode===200&&data.token){
                localStorage.setItem('userIdValue', JSON.stringify(data.userId));
                navigate("/home")
               
            }
            })
            .catch((err)=>{
             alert.log(err.message);
            })
        }
  return (
      <>
    <div className="login-container">
        <div className="login-card">
        <div className="login-content">
        <TextField id="outlined-basic" label="Email" variant="outlined" name="email" value={userData.email} onChange={handleChange}/>
        <TextField id="outlined-basic" label="Password" variant="outlined"
        type="password" name="password" value={userData.password} onChange={handleChange}
        />
        <span className="login-card-button" onClick={postData}>LOGIN</span>
        </div>
            <div>Not registered? <Link to="/signup">
                <span style={{
                    fontWeight:600,color:"#000000"
                }}>Create an account</span>
                </Link>
                </div>
            </div>
    </div>
      </>
  )
}
