import { ethers } from "ethers"
import Icon from "./Icon"

export default function HeadLine({
  playerLTKBalance,
  lotteryUSDCBalanceOnLottery,
  lotteryUSDCBalanceOnCompound,
}) {
  const currentDeposit =
    lotteryUSDCBalanceOnLottery > lotteryUSDCBalanceOnCompound
      ? lotteryUSDCBalanceOnLottery
      : lotteryUSDCBalanceOnCompound

  return (
    <div className='flex flex-col justify-center align-middle'>
      <h1 className='flex mx-auto justify-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300 p-5'>
        Start Saving & Winning{" "}
      </h1>
      {currentDeposit && (
        <div className='flex flex-col justify-center align-middle my-3'>
          <h1 className='mx-auto text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
            Currently on Lottery
          </h1>
          <h1 className='mx-auto pb-3 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
            {currentDeposit && ethers.utils.formatUnits(currentDeposit, 6)} USDC
          </h1>
        </div>
      )}
      {playerLTKBalance > 0 && (
        <div className='flex justify-center align-middle my-3'>
          <div className='flex flex-col mx-auto relative'>
            <h1 className='mx-auto text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
              {playerLTKBalance == 1 ? "My Lottery Token" : "My Lottery Tokens"}
            </h1>
            <h1 className='index-0 mx-auto text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
              {parseInt(ethers.utils.formatEther(playerLTKBalance))} LTK
            </h1>
            <Icon color='green-300' position='bottom-0 left-10' />
            <Icon color='green-300' position='bottom-0 right-10' />
          </div>
        </div>
      )}
    </div>
  )
}
