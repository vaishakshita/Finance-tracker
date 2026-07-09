"use client"
import React,{useEffect,useState} from 'react'
import SummaryCards from './components/SummaryCards'
import GoalSection from './components/GoalSection'
import GoalModal from './components/GoalModal'
import DeleteGoalModal from './components/DeleteGoalModal'
import AddSavingsmodal from './components/AddSavingsmodal'

const page = () => {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingGoal, setEditingGoal] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showSavingsModal, setShowSavingsModal] = useState(false);
  const [selectedGoalForSavings, setSelectedGoalForSavings] = useState(null);

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

  const handleDelete = async(id)=>{
    try{
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/goals/${id}`,{
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      fetchGoals()
      setShowDeleteModal(false)
      setSelectedGoal(null)
    } catch(error){
      console.log(error);
    }
  }

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

      <GoalSection goals={goals} setShowGoalModal={setShowGoalModal} setEditingGoal={setEditingGoal} setShowDeleteModal={setShowDeleteModal} setSelectedGoal={setSelectedGoal} setShowSavingsModal={setShowSavingsModal} setSelectedGoalForSavings={setSelectedGoalForSavings}/>
      
      {showGoalModal && <GoalModal setShowGoalModal={setShowGoalModal} fetchGoals={fetchGoals} editingGoal={editingGoal} setEditingGoal={setEditingGoal}/>}

      {showDeleteModal && <DeleteGoalModal setShowDeleteModal={setShowDeleteModal} handleDelete={handleDelete} goalId={selectedGoal?._id} goalTitle={selectedGoal?.title} setSelectedGoal={setSelectedGoal}/>}  

      {showSavingsModal && <AddSavingsmodal setShowSavingModal={setShowSavingsModal} selectedGoalForSavings={selectedGoalForSavings} fetchGoals={fetchGoals}/>}
    </div>
  )
}

export default page
