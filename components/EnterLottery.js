import EnterLotteryButton from "./EnterLotteryButton"
import ProgressBar from "./ProgressBar"

export default function EnterLottery({
  handleEnterLottery,
  lotteryAddress,
  endPlayTime,
  isFirstPlayer,
  progress,
}) {
  return (
    <div className='flex flex-col justify-center align-middle m-5 p-6 lg:w-1/2'>
      <h1 className='mb-2 pb-2 text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
        Win by Saving
      </h1>
      <h1 className='mb-2 p-2 text-2xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
        Pool2Gether is a crypto-powered savings protocol based on CompoundV3
      </h1>
      <h1 className='mb-2 p-2 text-2xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
        Save money and have a chance to win every day
      </h1>
      {!isFirstPlayer && endPlayTime && (
        <h1 className='mb-2 pb-2 text-xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
          Play this round until <br />
          {new Date(parseInt(endPlayTime) * 1000).toLocaleString()}
        </h1>
      )}

      <EnterLotteryButton
        handleEnterLottery={handleEnterLottery}
        lotteryAddress={lotteryAddress}
        progress={progress}
      >
        Start Saving & Winning
      </EnterLotteryButton>
      <ProgressBar progress={progress} />
    </div>
  )
}
