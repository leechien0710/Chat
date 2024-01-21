import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginApi } from '../../api/Login.api';
import Swal from 'sweetalert2';
function Signup() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        sessionStorage.setItem('username',username)
        LoginApi.signup({
            username: username,
            password: password
        }).then((res) => {
            console.log(res);
            localStorage.setItem('accessToken', res.data.accessToken)
            localStorage.setItem('refreshToken', res.data.refreshToken)
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Đăng kí thành công',
                showConfirmButton: false,
                timer: 1000,
            })
            setTimeout(() => {
                navigate('/login')
            }, 1000);
        }).catch((err) => {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Tên đăng nhập hoặc mật khẩu không đúng',
                showConfirmButton: false,
                timer: 1500,
            })
        })
    }

    return (
            <div className="Auth">
            <div className='content'>
            <div className='imgContain'>
            <img className='imgLogo' src='https://yt3.ggpht.com/ytc/AIf8zZQf5z17PMAXtnIpY0sD-BNw6Y1A1Z0M2MD3Aw8fpyxTP0lX9ka2Fy56nG97ATlz=s88-c-k-c0x00ffffff-no-rj'
            ></img></div>
            <h1 style={{textAlign:'center', }}>Đăng ký</h1>
            <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={username} onChange={(e) =>setUsername(e.target.value)}/>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" value={password} onChange={(e) =>setPassword(e.target.value)}/>
            </div>
            <div class="mb-3 form-check">
              <div  className='forgot'><Link to="/login">Login</Link></div>
            </div>
         
            <div className='submit'><button type="submit"  class="btn btn-primary btn-primary__login" >Đăng ký</button></div>
          </form>
            </div>
            </div>
    );
}

export default Signup;
