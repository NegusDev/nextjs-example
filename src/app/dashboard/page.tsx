'use client';
import Navbar from "@/components/Navbar";
import CardComponent from "@/components/dashboard/Card";
import { useAppSelector } from "@/redux/store";


export default function Dasboard() {
  const username = useAppSelector((state) => state.auth.value.username)
  return (
    <main className="min-h-screen flex-col items-center justify-between ">
      <Navbar />
      <div className="flex justify-between mt-8 mx-8">
        <h2>Dasboard Overview</h2>
        <h2 className="capitalize">Howdy, {username}</h2>
      </div>
      <hr className="h-px mb-8  mx-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className="contanier mx-8 my-3">
        <CardComponent />
      </div>
    </main>
  );
}