'use client';
import { getDashboardBackendData } from '@/app/api/dashboardAPI';
import { setDashboardData } from '@/redux/slices/dashboardSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function CardComponent() {
    

    const base_url = 'https://reservation.smartassetwatch.com/API/V1';

    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useAppSelector((state) => state.dashboard.value.isLoading);
    const admins = useAppSelector((state) => state.dashboard.value.admins);
    const users = useAppSelector((state) => state.dashboard.value.users);
    const daily = useAppSelector((state) => state.dashboard.value.daily);
    const reservations = useAppSelector((state) => state.dashboard.value.reservations);
    const uncleared = useAppSelector((state) => state.dashboard.value.uncleared);

    let i = 1;
    useEffect(() => {
        fetch(`${base_url}/dashboard`)
            .then((res) => res.json())
            .then((data: any) => {

                const SetPayload = {
                    isLoading: false,
                    users: data.users,
                    admins: data.admins,
                    reservations: data.reservations,
                    daily: data.daily_uncleared_bookings,
                    uncleared: data.uncleared_bookings,
                }

                dispatch(setDashboardData(SetPayload));

            })
    }, [dispatch])

    if (isLoading) return <p>Loading...</p>
    // if (!data) return <p>No data</p>


    return (
        <div >
            <div className="columns-4 mb-8">
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <span className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3">{admins}</span>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Admin</p>
                </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <span className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3">{users}</span>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Users</p>
                </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <span className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3">{reservations}</span>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Bookings</p>
                </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <span className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3">{daily}</span>
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
                        {uncleared.length === 0 ? (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td colSpan={12} className="text-center px-6 py-4">No data found</td>
                        </tr>) : (
                            uncleared.map((item, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {i++}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.number_of_people}
                                    </td>
                                    <td className={
                                        `${item.is_attended
                                            ? 'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'
                                            : 'bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300'} px-6 py-4`
                                    }>
                                        {item.is_attended === true ? 'Attended' : 'Unattended'}
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}