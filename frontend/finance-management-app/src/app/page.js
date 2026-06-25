import Link from "next/link";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-between min-h-screen px-16 py-7">
        <div className="max-w-xl -mt-30 ml-40">
          <h1 className="text-7xl font-sans text-purple-950 font-semibold">Take Control</h1>
          <h1 className="text-7xl font-sans text-purple-950 font-semibold">of Your</h1>
          <h1 className="text-8xl font-sans text-purple-950 font-semibold">Finances</h1>
          <p className="text-3xl text-purple-900 py-8">Track your income, monitor expenses, and gain insights into your spending habits - all in one simple and secure platform.</p>
          <div className="flex gap-7 py -6">
            {/* <button className="bg-purple-800 rounded-4xl w-45 h-15 flex justify-center items-center text-white text-2xl hover:scale-105 transition">Get Started</button> */}
            <p>
              <Link href="/signup" className="bg-purple-800 rounded-4xl w-45 h-15 flex justify-center items-center text-white text-2xl hover:scale-105 transition">
                Get Started
              </Link>
            </p>
            {/* <button className="border-2 border-purple-800 rounded-4xl w-90 h-15 flex justify-center items-center text-purple-800 text-2xl hover:scale-105 transition">Already have an account?</button> */}
            <p>
              <Link href="/login" className="border-2 border-purple-800 rounded-4xl w-90 h-15 flex justify-center items-center text-purple-800 text-2xl hover:scale-105 transition">
                Already have an account?
              </Link>
            </p>


          </div>
        </div>
        <div>
          <img src="https://img.magnific.com/free-photo/finance-business-accounting-analysis-management-concept_53876-15817.jpg?semt=ais_hybrid&w=740&q=80" className="w-150 h-112.5 rounded-2xl shadow-lg opacity-80 -mt-25 -ml-30" />
        </div>
      </div>

    </>

  );
}
