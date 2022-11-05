import { ethers } from "ethers"
import GetButton from "./GetButton"

export default function HowItWorks({
  lotteryFee,
  ticketPrice,
  handleGetStarted,
}) {
  return (
    <div className='flex justify-center lg:w-1/2'>
      <div className='m-5 p-6 max-w-sm bg-gradient-to-r from-violet-900 to-violet-700 rounded-lg border-2 border-t-pink-500 border-r-yellow-300 border-b-yellow-300 border-l-pink-500  hover:border-r-green-200  hover:border-b-green-200 transition ease-in-out duration-300 shadow-md'>
        <div className='flex flex-col justify-center align-middle'>
          <h1 className='mb-2 pb-2 text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
            How it Works
          </h1>
          <h1 className='mb-2 pt-3 pb-2 text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
            1. Deposit USDC for a Chance to Win
          </h1>
          <h1 className='mb-2 pb-2 text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
            2. Get a Lottery-Token
          </h1>
          <h1 className='mb-2 pb-2 text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
            3. Prizes are awarded every day
          </h1>
          <h1 className='mb-2 text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
            4. Even if you don&apos;t win, keep all of your money!
          </h1>
          <div className='flex'>
            {lotteryFee && ticketPrice ? (
              <div className='flex align-middle mx-auto'>
                <div className='flex flex-col m-auto mx-2 p-2 justify-center align-middle'>
                  <h1 className='mb-2 mx-auto text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
                    Lottery Fee
                  </h1>
                  <h1 className='mb-2 mx-auto text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
                    {lotteryFee && ethers.utils.formatEther(lotteryFee)} ETH
                  </h1>
                </div>

                <div className='flex flex-col m-auto mx-2 p-2 justify-center align-middle'>
                  <h1 className='mb-2 mx-auto text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
                    Ticket Price
                  </h1>
                  <h1 className='mb-2 mx-auto text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
                    {ticketPrice && ethers.utils.formatUnits(ticketPrice, 6)}{" "}
                    USDC
                  </h1>
                </div>
              </div>
            ) : (
              <h1 className='text-center text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
                Please connect to Goerli NetWork
              </h1>
            )}
          </div>
          <GetButton
            onClick={() => {
              handleGetStarted()
            }}
          >
            Get Started
          </GetButton>
        </div>
      </div>
    </div>
  )
}
