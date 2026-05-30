import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Today.css'

function Today() {
  const [spendings, setSpendings] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const guestId = localStorage.getItem('guestId');
    fetch('https://fe-be-api.com/api/spendings/todays', {
      headers: { 'X-Guest-Id': guestId },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setSpendings(json.data.spendings);
          setTotalAmount(json.data.totalAmount);
          setCount(json.data.count);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="app-screen page-padding">
      <h2>오늘 소비</h2>
      <p>오늘 기록 {count}개</p>
      <h3>총 {totalAmount.toLocaleString()}원</h3>

      {spendings.map((item, index) => (
        <div className="list-card" key={item.id ?? index}>
          <strong>{item.itemName}</strong>
          <p>{Number(item.amount).toLocaleString()}원 / {item.emotionTag}</p>
        </div>
      ))}

      <Link className="back-link" to="/home">홈으로</Link>
    </div>
  );
}

export default Today;
