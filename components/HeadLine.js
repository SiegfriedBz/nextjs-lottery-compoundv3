import { ethers } from "ethers"

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
    <div>
      <div className='flex flex-col justify-center align-middle'>
        <h1 className='flex mx-auto justify-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300 p-5'>
          Start Saving & Winning{" "}
        </h1>
        {playerLTKBalance > 0 && (
          <div className='flex flex-col justify-center align-middle my-3'>
            <h1 className='mx-auto text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
              Currently on Lottery
            </h1>
            <h1 className='mx-auto pb-3 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
              {currentDeposit && ethers.utils.formatUnits(currentDeposit, 6)}{" "}
              USDC
            </h1>
            <h1 className='mx-auto text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
              {playerLTKBalance == 1 ? "My Lottery Token" : "My Lottery Tokens"}
            </h1>
            <h1 className='mx-auto text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
              {parseInt(ethers.utils.formatEther(playerLTKBalance))} LTK
            </h1>
          </div>
        )}
      </div>
    </div>
  )
}
