import { ethers } from "ethers"
import EnterLotteryButton from "./EnterLotteryButton"

export default function Winners({
  winners,
  newWinner,
  newWinPrize,
  newWinDate,
}) {
  return (
    <div className='flex justify-center lg:w-1/2'>
      <div className='m-5 p-6 max-w-sm bg-gradient-to-r from-violet-900 to-violet-700 rounded-lg border-2 border-t-pink-500 border-r-yellow-300 border-b-yellow-300 border-l-pink-500  hover:border-r-green-200  hover:border-b-green-200 transition ease-in-out duration-300 shadow-md'>
        <h1 className='mb-2 pb-2 text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
          Previous Winners
        </h1>
        <ul className='mb-2 pb-2 text-xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
          {winners &&
            winners.map((winner, index) => {
              return (
                <li key={index}>
                  {winner.slice(0, 4)}...{winner.slice(38, 42)}
                </li>
              )
            })}
        </ul>
        {newWinner && newWinPrize && newWinDate && (
          <div className='mt-5'>
            {" "}
            <h1 className='mb-2 pb-2 text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
              New Winner
            </h1>
            <h1 className='mb-2 pb-2 text-xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
              {newWinner.slice(0, 4)}...{newWinner.slice(38, 42)}
            </h1>
            <h1 className='mb-2 pb-2 text-xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
              {newWinPrize} USDC
            </h1>
            <h1 className='mb-2 pb-2 text-xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
              {newWinDate}
            </h1>
          </div>
        )}
      </div>
    </div>
  )
}
