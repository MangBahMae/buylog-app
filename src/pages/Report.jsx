import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Report() {
  const [topEmotion, setTopEmotion] = useState("");
  const [aiInsight, setAiInsight] = useState("");
  const [nextPrinciple, setNextPrinciple] = useState("");

  useEffect(() => {
    const guestId = localStorage.getItem('guestId');
    fetch('https://fe-be-api.com/api/report', {
      headers: { 'X-Guest-Id': guestId },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setTopEmotion(json.data.topEmotion);
          setAiInsight(json.data.aiInsight);
          setNextPrinciple(json.data.nextPrinciple);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="app-screen page-padding">
      <h2>이번 달 Buylog 리포트</h2>

      <div className="report-card">
        <p>{topEmotion}</p>
        <p>{aiInsight}</p>
        <p>{nextPrinciple}</p>
      </div>

      <Link className="back-link" to="/home">홈으로</Link>
    </div>
  );
}

export default Report;
