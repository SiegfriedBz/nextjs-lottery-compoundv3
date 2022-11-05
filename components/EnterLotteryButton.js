export default function EnterLotteryButton(props) {
  const { handleEnterLottery, lotteryAddress, children } = props

  return (
    <div className='flex p-2 justify-center'>
      {lotteryAddress ? (
        <>
          <button
            className='text-xl text-green-200 hover:text-green-300 font-extrabold m-5 p-4 max-w-sm bg-gradient-to-r from-pink-500 to-yellow-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-600 rounded-lg border-4 border-yellow-300 hover:border-green-200 transition ease-in-out duration-500'
            onClick={async () => {
              await handleEnterLottery()
            }}
          >
            {children}
          </button>
        </>
      ) : (
        <h1 className='mb-2 text-center pb-2 text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
          Please connect to Goerli NetWork
        </h1>
      )}
    </div>
  )
}
