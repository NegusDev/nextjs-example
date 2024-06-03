import { usePathname } from 'next/navigation'
import Link from "next/link";

export default function UserNavBar() {
    const pathname = usePathname()
    return (
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <Link href="/reservation" className={` ${pathname === '/reservation' ? 'bg-blue-700' : ''} block py-2 px-3 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500`} >
                        Reservation
                    </Link>
                </li>
                <li>
                    <Link href="/history" className={` ${pathname === '/reservation' ? 'bg-blue-700' : ''} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>
                        History
                    </Link>
                </li>
                <li>
                    <Link href="/settings" className={`${pathname === '/settings' ? 'bg-blue-700' : ''} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>
                        Settings
                    </Link>
                </li>
                <li>
                    <Link href="/logout" className={` ${pathname === '/logout' ? 'bg-blue-700' : ''} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    )
}