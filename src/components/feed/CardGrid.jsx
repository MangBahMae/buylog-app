import { useEffect, useState } from 'react'
import './CardGrid.css'
import PurchaseCard from './PurchaseCard'
import AddCard from './AddCard'
import { fetchWithGuest } from '../../utils/api'
import ExImg from '../../assets/ExImg.png'

function CardGrid() {
    const [spendings, setSpendings] = useState([])

    useEffect(() => {
        // fetchWithGuest('http://localhost:8080/api/spendings/todays')
        //     .then(res => res.json())
        //     .then(data => setSpendings(data.data.spendings))

        setSpendings([
            {
                id: 1,
                amount: 4500,
                imageUrl: ExImg,
                itemName: '아이스 아메리카노',
                category: '카페',
                emotionTag: '잘 샀다',
                createdAt: new Date().toISOString(),
            },
            {
                id: 2,
                amount: 6000,
                imageUrl: ExImg,
                itemName: '편의점 간식',
                category: '식비',
                emotionTag: '스트레스',
                createdAt: new Date().toISOString(),
            },
            {
                id: 3,
                amount: 18000,
                imageUrl: ExImg,
                itemName: '올리브영',
                category: '뷰티',
                emotionTag: '잘 샀다',
                createdAt: new Date().toISOString(),
            }
        ])
    }, [])

    return (
        <div className="card-grid">
            {spendings.map(item => (
                <PurchaseCard
                    key={item.id}
                    amount={item.amount}
                    imageUrl={item.imageUrl}
                    itemName={item.itemName}
                    category={item.category}
                    emotionTag={item.emotionTag}
                    createdAt={item.createdAt}
                />
            ))}
            <AddCard />
        </div>
    )
}

export default CardGrid