import { ethers } from "ethers"

export default function HeadLine({ playerLTKBalance }) {
  return (
    <div>
      <div className='flex flex-col justify-center align-middle'>
        <h1 className='flex mx-auto justify-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300 p-5'>
          Start Saving & Winning{" "}
        </h1>
        {playerLTKBalance > 0 && (
          <h1 className='my-3 mx-auto pb-2 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
            My Lottery Tokens:{" "}
            {parseInt(ethers.utils.formatEther(playerLTKBalance))} LTK
          </h1>
        )}
      </div>
    </div>
  )
}
