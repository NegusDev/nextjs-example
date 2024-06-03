import { useState, useEffect } from 'react'

export default function CardComponent() {
    
    const base_url = 'https://reservation.smartassetwatch.com/API/V1';

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        fetch(`${base_url}/dashboard`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    return (
        <div >
            <div className="columns-4 mb-8">
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <span className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3">{data.admins}</span>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Admin</p>
                </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <span className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3">{data.users}</span>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Users</p>
                </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <span className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3">{data.reservations}</span>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Bookings</p>
                </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <span className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3">{data.daily_uncleared_bookings}</span>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Daily</p>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Visitors
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.uncleared_bookings.length === 0 ? (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td colspan="12" class="text-center px-6 py-4">No data found</td>
                        </tr>) : (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                1
                            </th>
                            <td className="px-6 py-4">
                                {data.uncleared_bookings.email}
                            </td>
                            <td className="px-6 py-4">
                                {data.uncleared_bookings.number_of_people}
                            </td>
                            <td className={
                                `${data.uncleared_bookings.is_attended
                                    ? 'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'
                                    : 'bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300'} px-6 py-4`
                            }>
                                {data.uncleared_bookings.is_attended === true ? 'Attended' : 'Unattended'}
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    )
}