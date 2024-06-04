import axios from 'axios'

const BASE_URL = 'https://reservation.smartassetwatch.com/API/V1';

export async function getDashboardBackendData() {
    let response = null;
    await axios({
        url: `${BASE_URL}/dashboard`,
        headers: {
            'Accept': 'application/json'
        },
        method: 'GET'
    })
        .then((res) => {
            response = res
        })
        .catch((e) => {
            response = e.response
        })
    return response
}