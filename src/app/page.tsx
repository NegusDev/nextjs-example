import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";



export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center justify-between ">
      <Navbar />
      <LoginForm />
    </main>
  );
}
