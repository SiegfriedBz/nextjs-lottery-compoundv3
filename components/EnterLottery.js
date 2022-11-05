import EnterLotteryButton from "./EnterLotteryButton"

export default function EnterLottery({
  handleEnterLottery,
  lotteryAddress,
  lotteryState,
  endPlayTime,
  isFirstPlayer,
  progress,
}) {
  return (
    <div className='flex justify-center lg:w-1/2'>
      <div className='m-5 p-6 max-w-sm bg-gradient-to-r from-violet-900 to-violet-700 rounded-lg border-2 border-t-pink-500 border-r-yellow-300 border-b-yellow-300 border-l-pink-500  hover:border-r-green-200  hover:border-b-green-200 transition ease-in-out duration-300 shadow-md'>
        <div className='flex flex-col justify-center align-middle'>
          <h1 className='mb-2 pb-2 text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
            Win by Saving.
          </h1>
          <h1 className='mb-2 p-2 text-2xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
            Win2Gether is a crypto-powered savings protocol based on CompoundV3.
          </h1>
          <h1 className='mb-2 p-2 text-2xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
            Save money and have a chance to win every day
          </h1>
          <div className='flex justify-center'>
            <h1 className='mb-2 p-2 text-2xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
              {lotteryState}{" "}
            </h1>
          </div>
          {!isFirstPlayer && endPlayTime && (
            <h1 className='mb-2 pb-2 text-xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
              Game ends at: <br />
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
        </div>
      </div>
    </div>
  )
}
