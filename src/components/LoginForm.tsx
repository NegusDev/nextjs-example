'use client';
import { FormEvent, useState } from "react";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const base_url = 'https://reservation.smartassetwatch.com/API/V1';

    async function onLoginSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError(null) // Clear previous errors when a new request starts
        try {
            const formData = new FormData(event.currentTarget)

            const details = {
                email: formData.get('email'),
                password: formData.get('password'),
            }
            const response = await fetch(`${base_url}/login`, {
                method: 'POST',
                body: JSON.stringify(details),
            })

            // // Handle response if necessaryif
            const data = await response.json()
            // if (!response.ok) {
            //     throw new Error('Network response was not ok ' + response.statusText);
            // }



            if (data.message.indexOf('successfully') > 0) {
                if (data.role_id === 1) {
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('role_id', data.role_id);
                    localStorage.setItem('user_id', data.user_id);
                    location.assign('/dashboard');

                } else if (data.role_id === 2) {
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('user_id', data.user_id);
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('role_id', data.role_id);
                    location.assign('/reservation');
                }
            } else {
                setError(data.message);
                console.log(data.message);
            }
        } catch (error) {
            // Capture the error message to display to the user
            console.error(error)
        } finally {
            setIsLoading(false)
        }
        // // ...
    }

    return (
        <div className="container mx-auto px-4">
            <h4>PEAS Lunch Reservation App</h4>
            <div className="columns-1">
                {error && <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div className="ms-3 text-sm font-medium">
                        {error}
                    </div>
                </div>}
                <form onSubmit={onLoginSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Submit'}
                    </button>
                </form>

            </div>
        </div>
    );
}