'use client';

import Navbar from "@/components/Navbar";
import { setBookingData } from "@/redux/slices/BookingSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function BookingsComponent() {
    const base_url = 'https://reservation.smartassetwatch.com/API/V1';
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useAppSelector((state) => state.bookings.value.isLoading);
    const bookings = useAppSelector((state) => state.bookings.value.bookings);

    useEffect(() => {
        fetch(`${base_url}/bookings`)
            .then((res) => res.json())
            .then((data: any) => {
                const SetPayload = {
                    isLoading: false,
                    bookings: data,
                }

                console.log(SetPayload)

                dispatch(setBookingData(SetPayload));

            })
    }, [dispatch])

    if (isLoading) return <p>Loading...</p>

    return (
        <main className="min-h-screen flex-col items-center justify-between ">
            <Navbar />
            <div className="flex justify-between mt-8 mx-8">
                <h2>Bookings</h2>
            </div>
            <hr className="h-px mb-8  mx-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="contanier mx-8 my-3">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
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
                                <th scope="col" className="px-6 py-3">
                                    Attended
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length === 0 ? (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td colSpan={12} className="text-center px-6 py-4">No data found</td>
                            </tr>) : (
                                bookings.map((booking, index) => (

                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index++}
                                        </th>
                                        <td className="px-6 py-4">
                                            {booking.date}
                                        </td>
                                        <td className="px-6 py-4">
                                            {booking.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {booking.number_of_people}
                                        </td>
                                        <td className={
                                            `${booking.is_cancelled
                                                ? 'bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300'
                                                : 'bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300'} `
                                        }>
                                            {booking.is_cancelled === true ? 'Cancelled' : 'Not Cancelled'}
                                        </td>
                                        <td className={
                                            `${booking.is_attended 
                                                ? 'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'
                                                : 'bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300'}`
                                        }>
                                            {booking.is_attended  === true ? 'Yes' : 'No'}
                                        </td>
                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}