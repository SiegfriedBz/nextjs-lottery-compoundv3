export default function ProgressBar({ progress }) {
  if (typeof progress == "undefined") return null

  return (
    <div className='flex justify-center align-middle'>
      <div className='w-full bg-gray-200 h-5 mb-6'>
        <div
          className='bg-gradient-to-r from-pink-500 to-yellow-300 h-5'
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}
