import './Result.css'
import { useState } from "react";
import { ChevronLeft, MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const { result, imageUrl } = location.state || {};

  const [emotionTag, setEmotionTag] = useState("");
  const [sheetY, setSheetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startSheetY, setStartSheetY] = useState(0);

  const emotions = [
    "🌿 잘 샀다",
    "🏝️ 기분전환",
    "😈 스트레스",
    "😊 보상심리",
    "💪 충동구매",
    "🎁 관계/선물",
  ];

  const toggleEmotion = (emotion) => {
    setEmotionTag(emotionTag === emotion ? "" : emotion);
  };

  const handleDragStart = (clientY) => {
    setIsDragging(true);
    setStartY(clientY);
    setStartSheetY(sheetY);
  };

  const handleDragMove = (clientY) => {
    if (!isDragging) return;

    const diff = clientY - startY;
    const nextY = startSheetY + diff;

    if (nextY <= 0 && nextY >= -360) {
      setSheetY(nextY);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    if (sheetY < -180) {
      setSheetY(-360);
    } else {
      setSheetY(0);
    }
  };

  const handleSave = async () => {
    const guestId = localStorage.getItem('guestId');
    try {
      const res = await fetch('https://fe-be-api.com/api/spendings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Guest-Id': guestId,
        },
        body: JSON.stringify({
          imageUrl,
          itemName: result.itemName,
          category: result.category,
          amount: result.amount,
          purchaseDate: result.purchaseDate,
          emotionTag,
          satisfactionLevel: '잘 샀다',
          aiConfidence: result.aiConfidence,
        }),
      });
      const data = await res.json();
      if (data.success) {
        navigate('/feed');
      } else {
        alert(data.error?.message || '저장에 실패했습니다.');
      }
    } catch (e) {
      alert('저장에 실패했습니다.');
    }
  };

  return (
    <div
      className="phone-frame result-page"
      onMouseMove={(e) => handleDragMove(e.clientY)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
      onTouchEnd={handleDragEnd}
    >
      <div
        className="result-bg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      <div className="result-overlay"></div>

      <div className="top-bar result-top">
        <span className="top-time">9:41</span>

        <div className="top-icons">
          <span>●●●</span>
          <span>⌁</span>
          <span className="battery"></span>
        </div>
      </div>

      <button className="result-back" onClick={() => navigate("/buylog")}>
        <ChevronLeft size={24} />
      </button>

      <div className="location-pill">
        <MapPin size={16} />
        부천시 역곡동
      </div>

      <div className="result-info">
        <input className="product-input" value={result?.itemName || ""} readOnly />
        <input className="category-input" value={result?.category || ""} readOnly />

        <div className="price-box">
          <div className="percent-circle">{result?.aiConfidence ?? 80}%</div>
          <input
            className="price-input"
            value={result?.amount != null ? `금액 ${Number(result.amount).toLocaleString()}원` : ""}
            readOnly
          />
        </div>
      </div>

      <div
        className="bottom-sheet"
        style={{
          transform: `translateY(${sheetY}px)`,
          transition: isDragging ? "none" : "transform 0.25s ease",
        }}
      >
        <div
          className="sheet-handle"
          onMouseDown={(e) => handleDragStart(e.clientY)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
        ></div>

        <div className="bottom-sheet-content">
          <label className="sheet-label">한 줄 다이어리</label>

          <textarea
            className="diary-input"
            defaultValue={`피부가 많이 건조했는데
필요했던 제품이라 만족! 😍`}
          />

          <p className="emotion-title">오늘의 감정은?</p>

          <div className="emotion-buttons">
            {emotions.map((emotion) => (
              <button
                key={emotion}
                type="button"
                className={
                  emotionTag === emotion
                    ? "emotion-button selected"
                    : "emotion-button"
                }
                onClick={() => toggleEmotion(emotion)}
              >
                {emotion}
              </button>
            ))}
          </div>

          <button className="login-btn primary" onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
