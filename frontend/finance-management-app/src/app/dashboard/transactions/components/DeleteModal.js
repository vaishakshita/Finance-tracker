"use client"
import React from 'react'
import ButtonLoader from '@/app/components/loading/ButtonLoader';

const DeleteModal = ({ showDeleteModal, setShowDeleteModal, handleDeleteTransaction, loading, }) => {
  if (!showDeleteModal) return null;
  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center p-10 z-50'>
      <div className='bg-white rounded-xl p-6 w-[350px]'>
        <h2 className='text-xl font-bold text-center mb-4'>Delete Transaction</h2>
        <p className='text-center text-gray-600 mb-6'>Are you sure you want to delete this transaction?</p>
        <div className='flex justify-end gap-3'>
          <button onClick={() => setShowDeleteModal(false)} disabled={loading} className={`border px-4 py-2 rounded-lg transition ${loading
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-100"
            }`}>Cancel</button>

          <button onClick={handleDeleteTransaction} disabled={loading} className={` text-white px-4 py-2 rounded-lg ${loading
            ? "bg-red-400 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
            }`}>{loading ? (<ButtonLoader text="Deleting..." />) : ("Delete")}</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
