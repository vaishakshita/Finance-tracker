"use client"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

//import icons
import { GiTakeMyMoney } from "react-icons/gi";
import { SiSimpleanalytics } from "react-icons/si";
import { BiHome } from "react-icons/bi";
import { GoGoal } from "react-icons/go";
import { GrTransaction } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";

const Sidebar = () => {
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = () => {
        localStorage.removeItem("token")
        router.push("/")
    }

    //menu
    const menuItems = [
        { name: "Home", path: "/dashboard", icon:<BiHome size={60}/> },
        { name: "Transactions", path: "/dashboard/transactions", icon: <GrTransaction size={60}/> },
        { name: "Analytics", path: "/dashboard/analytics", icon: <SiSimpleanalytics size={56}/> },
        { name: "Goals", path: "/dashboard/goals", icon: <GoGoal size={60}/> },
    ]

    return (
        <>

            <div className="bg-purple-400 fixed top-0 left-0 h-full text-center transform transition-transition duration-300 w-20 md:w-57 p-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-row fixed top-15">
                        <GiTakeMyMoney size={60}/>
                        <h2 className="font-semibold font-sans text-3xl py-2">Montera</h2>
                    </div>
                </div>

                {/* Menu */}
                <div className="flex flex-col fixed top-40 gap-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`flex items-center gap-3 p-2 rounded-lg transition-all hover:bg-purple-200
            ${pathname === item.path ? "bg-purple-300" : ""}`}
                        >
                            <span className="flex justify-center items-center w-8 text-purple-950">{item.icon}</span>
                            <span className="text-xl font-sans font-semibold text-purple-950">{item.name}</span>
                        </Link>
                    ))}

                    {/* Logout */}
                    <button onClick={handleLogout} className="flex items-center gap-3 p-2 mt-10 hover:bg-red-300 rounded-lg">
                        <span className="text-2xl w-8 flex justify-center">
                            <FiLogOut size={60} className="text-purple-950"/>
                        </span>
                        <span className="text-xl font-sans font-semibold text-purple-950 min-w-[20px]">Logout</span>
                    </button>
                </div>
            </div>

        </>
    )
}

export default Sidebar