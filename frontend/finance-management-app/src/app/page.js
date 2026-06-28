import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen px-16 md:px-10 lg:px-16 py-10">
        <div className="max-w-xl my-20 md:my-40 lg:">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-sans text-purple-950 font-semibold">Take Control</h1>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-sans text-purple-950 font-semibold">of Your</h1>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-sans text-purple-950 font-semibold">Finances</h1>
          <p className="text-lg md:text-xl lg:text-2xl text-purple-900 py-8">Track your income, monitor expenses, and gain insights into your spending habits - all in one simple and secure platform.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* <button className="bg-purple-800 rounded-4xl w-45 h-15 flex justify-center items-center text-white text-2xl hover:scale-105 transition">Get Started</button> */}
            <p>
              <Link href="/signup" className="bg-purple-800 rounded-4xl min-w-[170px] min-h-[50px] flex justify-center items-center text-white text-2xl hover:scale-105 transition">
                Get Started
              </Link>
            </p>
            {/* <button className="border-2 border-purple-800 rounded-4xl w-90 h-15 flex justify-center items-center text-purple-800 text-2xl hover:scale-105 transition">Already have an account?</button> */}
            <p>
              <Link href="/login" className="border-2 border-purple-800 rounded-4xl min-w-[230px] min-h-[50px] flex justify-center items-center text-purple-800 text-2xl hover:scale-105 transition px-4">
                Already have an account?
              </Link>
            </p>


          </div>
        </div>
        <div>
          <img src="https://img.magnific.com/free-photo/finance-business-accounting-analysis-management-concept_53876-15817.jpg?semt=ais_hybrid&w=740&q=80" className="w-full lg:w-[600px] rounded-2xl shadow-lg opacity-80" />
        </div>
        {/* <Image
    src="https://img.magnific.com/free-photo/finance-business-accounting-analysis-management-concept_53876-15817.jpg?semt=ais_hybrid&w=740&q=80"
    width={600}
    height={500}
    alt="Finance Dashboard"
    className="w-full max-w-xl rounded-2xl shadow-lg"
/> */}
      </div>

    </>

  );
}
