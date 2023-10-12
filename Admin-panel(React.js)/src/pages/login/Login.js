import './login.scss'
import { useState } from 'react';
import PropTypes from 'prop-types';



   async function loginUser(credentials) {
    return fetch('/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function Login ({ setToken }){

    const [msg,setMsg] = useState('')

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          email,
          password
        });
        if(token.msg){
          setMsg(token.msg)

        }
        else{
        localStorage.setItem('token', token);
        setToken(token);
        console.log(token)
        }
      }

    return (
        <div className='loginContainer'>
        <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    <div className="content">
                      <p className='errormsglogin'>{msg}</p>
                    <div className="input-field">
                        <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
                    </div> 
                    <div className='input-field'>
                        <button type='submit'>Submit</button>
                        </div> 
                    
                    </div>
                    <div className="action">
                   
                    </div>
                </form>
                </div>
            </div>
    )
}



Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }