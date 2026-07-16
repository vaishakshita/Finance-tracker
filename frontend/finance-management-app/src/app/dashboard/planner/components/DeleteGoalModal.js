"use client"
import React from 'react'
import ButtonLoader from '@/app/components/loading/ButtonLoader'

const DeleteGoalModal = ({loading,setShowDeleteModal, handleDelete, goalId, goalTitle, setSelectedGoal}) => {
  return (
    <div className='fixed inset-0 p-5 bg-black/40 flex justify-center items-center z-50'>
      <div className='bg-white rounded-2xl w-full max-w-md p-8 shadow-xl'>
        <h2 className='text-2xl font-bold text-red-600'>Delete Goal</h2>
        <p className="mt-4 text-gray-600">Are you sure you want to delete</p>
        <p className="font-semibold text-lg mt-1 text-purple-900">"{goalTitle}"</p>
        <p className="text-gray-500 mt-4">This action cannot be undone.</p>

        <div className="flex justify-end gap-3 mt-8">
            <button onClick={()=>{setShowDeleteModal(false); setSelectedGoal(null);}} disabled={loading} className={`px-5 py-2 rounded-lg border border-gray-300 transition ${loading
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100"
            }`}>Cancel</button>

            <button onClick={()=>handleDelete(goalId)} disabled={loading} className={`px-5 py-2 rounded-lg text-white transition ${loading
            ? "bg-red-400 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
            }`}>{loading ? (<ButtonLoader text="Deleting..." />) : ("Delete")}</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteGoalModal
