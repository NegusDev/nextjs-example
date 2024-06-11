'use client';
import Navbar from "@/components/Navbar";
import ReservationForm from "@/components/reservation/ReservationForm";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";


export default function Reservation() {
    const base_url = 'https://reservation.smartassetwatch.com/API/V1';
    const username = useAppSelector((state) => state.auth.value.username);

    return (
        <main className="min-h-screen flex-col items-center justify-between ">
            <Navbar />
            <div className="flex justify-between mt-8 mx-8">
                <h2 className="capitalize">Howdy, {username}</h2>
            </div>
            <p className="mx-8">Specify your <Link className="text-gray-500 dark:text-gray-400" href="/dietaries">here</Link> and <Link className="text-gray-500 dark:text-gray-400" href="/allergies">Allergies here</Link></p>
            <hr className="h-px mb-8  mx-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="contanier mx-8 my-3">
                <Image src="/WeeklyMenu.png"
                    width={800}
                    height={500}
                    alt="PEAS Weekly Menu" />
              <ReservationForm />  
            </div>
        </main>
    )
}
