import { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate;
  const [historys, setHistorys] = useState([]);
  const token = localStorage.getItem("accessToken");
  function formatDateTime(dateTimeString) {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };
  
    const formattedDateTime = new Date(dateTimeString).toLocaleString('en-GB', options);
    return formattedDateTime.replace(',', ';');
  }
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    // Lấy token từ localStorage
    // Kiểm tra xem token có tồn tại không
    if (token) {
      axios
        .get("http://localhost:8080/api/historys", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("history data: ", response.data);
          setHistorys(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
      <h2 style={{textAlign:'center', margin:'1.5em 0'}}>Lịch sử nạp</h2>
      <table class="table table-bordered border-primary">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Số Tiền</th>
            <th scope="col">Thời gian</th>
          </tr>
        </thead>
        <tbody>
        {historys.map((history) => (
            <tr key={history.id}>
              <td>{history.id}</td>
              <td>{history.amount}</td>
              <td>{formatDateTime(history.createdAt)}</td>
              {/* Thêm các cột khác tùy thuộc vào dữ liệu bạn có */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};
export default History;
