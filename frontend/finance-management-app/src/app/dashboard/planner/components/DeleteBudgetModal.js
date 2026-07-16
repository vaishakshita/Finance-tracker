import React from 'react'
import ButtonLoader from '@/app/components/loading/ButtonLoader'

const DeleteBudgetModal = ({ loading, setShowDeleteBudgetModal, handleDeleteBudget, budgetId, budgetCategory, setSelectedBudget }) => {
  return (
    <div className="fixed inset-0 p-5 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-red-600">Delete Budget</h2>
        <p className="mt-4 text-gray-600">Are you sure you want to delete
          <span>{" "}{budgetCategory}</span> ?
        </p>
        <div className='mt-8 flex justify-end gap-3'>

          <button type='button' disabled={loading} onClick={() => {
            setSelectedBudget(null)
            setShowDeleteBudgetModal(false)
          }} className={`rounded-lg border border-gray-300 px-5 py-2 text-gray-700 transition ${loading
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100"
            }`}>Cancel</button>

          <button type='submit' disabled={loading} onClick={() => handleDeleteBudget(budgetId)} className={`rounded-lg px-5 py-2 text-white transition ${loading
            ? "bg-red-400 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
            }`}>{loading ? (<ButtonLoader text="Deleting..." />) : ("Delete")}</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBudgetModal
