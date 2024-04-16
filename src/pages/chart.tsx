import axios from 'axios';
import { useEffect } from 'react';

const Chart = () => {
    const token = localStorage.getItem('token')
    const subject: any[] = []
    const time: any[] = []
    const fetchdata = async() => {
        const response = await axios.get('http://localhost:8080/getchart', {
            headers: {
                Authorization: token
            }
        })
        for(let i = 0; i < response.data.data.length; i++){
            subject.push(response.data.data[i].subject)
            time.push(response.data.data[i]._sum.study_time)
        }
        console.log(subject)
        console.log(time)
    }
    useEffect(() => {
        fetchdata()
    },[])

    return (
        <div>asd</div>
    )
}

export default Chart