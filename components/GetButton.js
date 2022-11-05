import { Children } from "react"

export default function GetButton({ onClick, children }) {
  return (
    <div className='flex justify-center'>
      <button
        className='text-xl text-green-200 hover:text-green-300 font-extrabold m-5 p-4 max-w-sm bg-gradient-to-r from-pink-500 to-yellow-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-600 rounded-lg border-4 border-yellow-300 hover:border-green-200 transition ease-in-out duration-500'
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}
