"use client"
import React,{useEffect,useState} from 'react'
import SummaryCards from './components/SummaryCards'
import GoalSection from './components/GoalSection'
import GoalModal from './components/GoalModal'

const page = () => {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [showGoalModal, setShowGoalModal] = useState(false)

  const fetchGoals = async()=>{
    try{
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:5000/api/goals",{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });

      const data = await res.json();
      setGoals(data);
    } catch(error){
      console.log(error);
    } finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchGoals();
  },[])

  const totalSaved = goals.reduce(
    (sum,goal)=> sum += goal.savedAmount, 0
  )

  const totalTarget = goals.reduce(
    (sum,goal)=> sum += goal.targetAmount, 0
  )

  const activeGoals = goals.length

  return (
    <div className='px-6'>
      <h1 className='text-4xl font-bold text-purple-900 mb-8'>Financial Planner</h1>
      <SummaryCards totalSaved={totalSaved} totalTarget={totalTarget} activeGoals={activeGoals}/>
      <GoalSection goals={goals} setShowGoalModal={setShowGoalModal}/>
      {showGoalModal && <GoalModal setShowGoalModal={setShowGoalModal} fetchGoals={fetchGoals}/>}
    </div>
  )
}

export default page
