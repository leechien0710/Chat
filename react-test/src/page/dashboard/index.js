import Header from '../../component/header/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DashBoardApi } from '../../api/DashBoard.api';
import Swal from 'sweetalert2';

function Dashboard() {
    const [amount,setAmount] = useState('') 
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        let token = localStorage.getItem('accessToken')
        console.log('amout + token',amount,token)
        if(token&&amount){
            axios.post('http://localhost:8080/api/charge',{amount: amount}, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
        .then(
            (res) => {
                console.log(res);
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Nạp thành công',
                    showConfirmButton: false,
                    timer: 1000,
                })
                setTimeout(() => {
                    navigate('/thank')
                }, 1000);
            })
        .catch((err) => {
            console.log(amount)
            console.log('token', token)
            console.log(err)
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Nạp thất bại',
                showConfirmButton: false,
                timer: 1500,
            })
        })
    }
    }
    return (
        <div>
            <Header />
            <div className='main'>
                <div className='container' >
                <div className='conent' style={{display: 'flex', marginTop: '50px'}} >
                <img src= 'https://dailygame.vn/uploads/images/WTnCdEt.png' width={'500px'} height={'500px'}></img>
                <div className='content-right' style={{marginLeft: '20px'}}>
                    <p style={{fontWeight: 'bold'}}>Tên chủ tài khoản:</p>
                    <p style={{fontWeight: 'bold'}}>Số tài khoản: 00120103123</p>
                    <p style={{fontWeight: 'bold'}}>Ngân Hàng: VCB</p>
                    <span> Nhập số tiền nạp: </span>
                    <form onSubmit={handleSubmit}>
                    <input type='text' value={amount} onChange={(e)=> setAmount(e.target.value)}></input><br></br>
                    <button className='btn btn-primary' >Nạp tiền</button>
                    </form>
                </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
