import Header from '../../component/header/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DashBoardApi } from '../../api/DashBoard.api';
import Swal from 'sweetalert2';

function Dashboard() {
    const [amount,setAmount] = useState('') 
    let acc = '103871041567'
    let bank = 'Vietinbank'
    var [total,setTotal] = useState('')
    const navigate = useNavigate()
    
    const handleInput = (e) => {
        setAmount(e.target.value);
      };
    const handleOnclick = (e) => {
        e.preventDefault();
        setTotal(amount)
        console.log('total' , total)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        let token = localStorage.getItem('accessToken')
        setTotal(amount)
    //     if(token&&amount){
    //         axios.post('http://localhost:8080/api/charge',{amount: amount}, {
    //             headers: {
    //               Authorization: `Bearer ${token}`
    //             }
    //           })
    //     .then(
    //         (res) => {
    //             console.log(res);
    //             Swal.fire({
    //                 position: 'top',
    //                 icon: 'success',
    //                 title: 'Nạp thành công',
    //                 showConfirmButton: false,
    //                 timer: 1000,
    //             })
    //             setTimeout(() => {
    //                 navigate('/thank')
    //             }, 1000);
    //         })
    //     .catch((err) => {
    //         console.log(amount)
    //         console.log('token', token)
    //         console.log(err)
    //         Swal.fire({
    //             position: 'top',
    //             icon: 'error',
    //             title: 'Nạp thất bại',
    //             showConfirmButton: false,
    //             timer: 1500,
    //         })
    //     })
    // }

    }
    console.log('amput'+ amount + 'total'+ total)
    let link = 'https://qr.sepay.vn/img?acc='+ acc + '&bank='+ bank +'&amount='+total+'&des=NOI_D&template=qronly'
    return (
        <div>
            <Header />
            <div className='main'>
                <div className='container' >
                <div className='conent' style={{display: 'flex', marginTop: '50px'}} >
                <img src= {link} width={'500px'} height={'500px'}></img>
                <div className='content-right' style={{marginLeft: '20px'}}>
                    <p style={{fontWeight: 'bold'}}>Tên chủ tài khoản:</p>
                    <p style={{fontWeight: 'bold'}}>Số tài khoản: 00120103123</p>
                    <p style={{fontWeight: 'bold'}}>Ngân Hàng: VCB</p>
                    <span> Nhập số tiền nạp: </span>
                    <input type='text' value={amount} onChange={handleInput}></input><br></br>
                    <button className='btn btn-primary' onClick={handleOnclick}>Nạp tiền</button>
                </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
