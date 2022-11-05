export default function UserWithDraw({
  lotteryAddress,
  endWithDrawTime,
  handlePlayerWithdraw,
}) {
  return (
    <div className='flex justify-center lg:w-1/2'>
      <div className='m-5 p-6 max-w-sm bg-gradient-to-r from-violet-900 to-violet-700 rounded-lg border-2 border-t-pink-500 border-r-yellow-300 border-b-yellow-300 border-l-pink-500  hover:border-r-green-200  hover:border-b-green-200 transition ease-in-out duration-300 shadow-md'>
        <h1 className='mb-2 pb-2 text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
          Withdraw my USDC
        </h1>
        <div className='flex flex-col p-2 justify-center'>
          {lotteryAddress ? (
            <>
              <button
                className='text-xl text-green-200 font-extrabold m-5 p-4 max-w-sm bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg border-2 border-red-200 hover:border-red-500 transition ease-in-out duration-500'
                onClick={() => {
                  handlePlayerWithdraw()
                }}
              >
                Withdraw my USDC & Burn my Lottery Tokens
              </button>
              <h1 className='text-center mb-2 mx-auto pb-2 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
                I m aware that I will burn my LTK <br /> & will lose my chance
                to win
              </h1>
              {endWithDrawTime && (
                <h1 className='mb-2 pb-2 text-lg text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
                  Withdrawing time until
                  <br />
                  {new Date(parseInt(endWithDrawTime) * 1000).toLocaleString()}
                </h1>
              )}
            </>
          ) : (
            <h1 className='mb-2 text-center pb-2 text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
              Please connect to Goerli NetWork
            </h1>
          )}
        </div>
      </div>
    </div>
  )
}
