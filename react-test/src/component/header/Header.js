import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Header(props) {
  const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({});
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    useEffect(() => {
      if(!token){
        navigate('/login')
        return
      }
      // Lấy token từ localStorage
      
      // Kiểm tra xem token có tồn tại không
      if (token) {
        const getNewAccessToken = () => {
          axios.post('http://localhost:8080/api/refreshtoken', {
            refreshToken: refreshToken, accessToken: token
          })
          .then(response => {
            const newAccessToken = response.data.accessToken;
            console.log(response.data)
            console.log(newAccessToken)
            localStorage.setItem('accessToken', newAccessToken);
          })
          .catch(error => {
            console.error('Error refreshing access token:', error);
            // Xử lý khi không thể refresh token (ví dụ: đăng xuất người dùng)
            navigate('/login');
          });
        };
        // Gửi yêu cầu đến backend để lấy thông tin người dùng
        axios.get('http://localhost:8080/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          console.log('reponse data: ',response.data)
          setUserInfo(response.data);
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
          navigate("/login")
        });
        const refreshTokenInterval = setInterval(() => {
          getNewAccessToken();
        }, 3*60*1000); // 1 phút = 60.000 milliseconds
    
        // Clear interval khi component unmount
        return () => clearInterval(refreshTokenInterval);
      }
    },[token] );
    console.log('userInfo: ',userInfo)
  userInfo? console.log("co userINFO") : console.log("KHONG CO UserInfo")
  const handleLogout = (e) =>{
    e.preventDefault()
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login')
  }
   
  return (
    <div className="header" style={{backgroundColor:"#F8F9FA"}}>
    <div className="container">
      <nav className="navbar navbar-expand-lg  bg-body-tertiary" >
        <div class="container-fluid">
          <Link class="navbar-brand" to="#">
            <img src="https://dailygame.vn/uploads/images/WTnCdEt.png" width={"50px"} height={"50px"} />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/dashboard">
                   {userInfo && userInfo.username ? userInfo.username: "khong co userInfo"}
                </Link>
              </li>
              <li class="nav-item">
                <button class="nav-link"  onClick={handleLogout}>
                  Đăng xuất
                </button>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/history" >
                  Lịch sử
                </Link>
              </li>
            </ul>
            <span class="navbar-text" style={{fontWeight:'bold'}}>Tổng tiền: {(userInfo && userInfo.funds) || (userInfo && userInfo.funds === 0) ? userInfo.funds: "khong co funds"}
            </span>
          </div>
        </div>
      </nav>
      </div>
    </div>
  );
}

export default Header;
