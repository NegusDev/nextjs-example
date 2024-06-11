'use client';
import { FormEvent, useState } from "react";
import Alert from "../Alert";
import SessionClosed from "./SessionClosed";

export default function ReservationForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<string | null>(null);
    const currentDate = new Date();

    const base_url = 'https://reservation.smartassetwatch.com/API/V1';

    async function onReservatiobSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError(null) // Clear previous errors when a new request starts
        setData(null) // Clear previous errors when a new request starts

        try {
            const formData = new FormData(event.currentTarget)

            const details = {
                date: formData.get('date'),
                people: formData.get('people'),
                userId: localStorage.getItem('user_id'),
            }


            const response = await fetch(`${base_url}/reservation`, {
                method: 'POST',
                body: JSON.stringify(details),
            })

            const data = await response.json()

            if (data.message.indexOf('successfully') > 0) {
              setData(data.message);
            } else {
                setError(data.message);
            }
        } catch (error) {
            // Capture the error message to display to the user
            console.error(error)
        } finally {
            setIsLoading(false)
        }
        // // ...
    }

    if (currentDate.getHours() >= 9 && currentDate.getHours() < 18) return <SessionClosed />;

    return (
        <div className="container mt-4 ">
            <h4 className="text-3xl font-bold dark:text-white">Make Reservation</h4>
            {error && <Alert message={error} alertType={'red'} />}
            {data  && <Alert message={data} alertType={'green'} /> }
            <form onSubmit={onReservatiobSubmit}>
                <div className="mb-5">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                    <input type="date" id="date" name="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="people" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of People</label>
                    <input type="number" id="people" name="people" value="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>

        </div>
    );
}