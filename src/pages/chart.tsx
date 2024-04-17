import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
    const token = localStorage.getItem('token')
    const [subject, setSubject] = useState<string[]>([]);
    const [time, setTime] = useState<number[]>([]);
    const fetchdata = async () => {
        const response = await axios.get('http://localhost:8080/getchart', {
            headers: {
                Authorization: token
            }
        })
        const subjects: string[] = [];
        const times: number[] = [];
        for (let i = 0; i < response.data.data.length; i++) {
            subjects.push(response.data.data[i].subject.toString());
            times.push(response.data.data[i]._sum.study_time);
        }
        setSubject(subjects);
        setTime(times);
    }
    useEffect(() => {
        fetchdata();
    }, []);
    const data = {
        labels: subject,
        datasets: [
            {
                data: time,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(233, 30, 99, 0.2)',
                    'rgba(63, 81, 181, 0.2)',
                    'rgba(0, 150, 136, 0.2)',
                    'rgba(205, 220, 57, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(233, 30, 99, 1)',
                    'rgba(63, 81, 181, 1)',
                    'rgba(0, 150, 136, 1)',
                    'rgba(205, 220, 57, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ width: '500px', height: '500px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Doughnut data={data} />
        </div>
    )
}

export default Chart;
