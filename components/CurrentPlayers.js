import { ethers } from "ethers"
import EnterLotteryButton from "./EnterLotteryButton"

export default function CurrentPlayers({
  handleEnterLottery,
  lotteryAddress,
  players,
  progress,
}) {
  return (
    <div className='flex justify-center lg:w-1/2'>
      <div className='m-5 p-6 max-w-sm bg-gradient-to-r from-violet-900 to-violet-700 rounded-lg border-2 border-t-pink-500 border-r-yellow-300 border-b-yellow-300 border-l-pink-500  hover:border-r-green-200  hover:border-b-green-200 transition ease-in-out duration-300 shadow-md'>
        <h1 className='mb-2 pb-2 text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
          Current Players
        </h1>
        <ul className='mb-2 pb-2 text-xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
          {players &&
            players.map((player, index) => {
              return (
                <li key={index}>
                  {player.slice(0, 4)}...{player.slice(38, 42)}
                </li>
              )
            })}
        </ul>
        <EnterLotteryButton
          handleEnterLottery={handleEnterLottery}
          lotteryAddress={lotteryAddress}
          progress={progress}
        >
          Start Saving & Winning
        </EnterLotteryButton>
      </div>
    </div>
  )
}
