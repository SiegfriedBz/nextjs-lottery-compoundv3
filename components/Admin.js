import { ethers } from "ethers"

export default function Admin({
  admin,
  lotteryAddress,
  lotteryTokenAddress,
  usdcAddress,
  lotteryETHBalance,
  lotteryUSDCBalanceOnLottery,
  lotteryUSDCBalanceOnCompound,
  handleAdminFundLotteryAndApproveAndSupplyCompound,
  handleAdminWithdrawETH,
}) {
  const GOERLI_ETHERSCAN_BASEURL = "https://goerli.etherscan.io/address/"
  return (
    <div>
      <div className='flex justify-center'>
        <div className='m-5 p-6 max-w-sm bg-gradient-to-r from-violet-900 to-violet-700 rounded-lg border-2 border-t-pink-500 border-r-yellow-300 border-b-yellow-300 border-l-pink-500  hover:border-r-green-200  hover:border-b-green-200 transition ease-in-out duration-300 shadow-md'>
          <h1 className='mb-2 pb-2 text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
            Admin
          </h1>
          <div className='flex p-2 justify-center'>
            {admin && (
              <div className='flex flex-col p-2 justify-center align-middle'>
                <h1 className='mb-2 mx-auto pb-2 text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
                  Admin: {admin.slice(0, 4)}...
                  {admin.slice(38, 42)}
                </h1>
                <h1 className='mb-2 mx-auto pb-2 text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
                  Lottery Etherscan:{" "}
                  {lotteryAddress && (
                    <a href={`${GOERLI_ETHERSCAN_BASEURL}/${lotteryAddress}`}>
                      {lotteryAddress.slice(0, 4)}...
                      {lotteryAddress.slice(38, 42)}
                    </a>
                  )}
                </h1>
                <h1 className='mb-2 mx-auto pb-2 text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
                  LTK Etherscan:{" "}
                  {lotteryTokenAddress && (
                    <a
                      href={`${GOERLI_ETHERSCAN_BASEURL}/${lotteryTokenAddress}`}
                    >
                      {lotteryTokenAddress.slice(0, 4)}...
                      {lotteryTokenAddress.slice(38, 42)}
                    </a>
                  )}
                </h1>
                <h1 className='mb-2 mx-auto pb-2 text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
                  USDC Etherscan:{" "}
                  {usdcAddress && (
                    <a href={`${GOERLI_ETHERSCAN_BASEURL}/${usdcAddress}`}>
                      {usdcAddress.slice(0, 4)}...
                      {usdcAddress.slice(38, 42)}
                    </a>
                  )}
                </h1>
                <h1 className='mb-2 mx-auto pb-2 text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
                  <div className='flex flex-col'>
                    <div className='flex mx-auto'>Lottery Balance</div>
                    <div className='flex mx-auto'>
                      {lotteryETHBalance &&
                        ethers.utils.formatEther(lotteryETHBalance)}{" "}
                      ETH
                    </div>
                    <div className='flex mx-auto'>
                      {lotteryUSDCBalanceOnLottery &&
                        ethers.utils.formatUnits(
                          lotteryUSDCBalanceOnLottery,
                          6
                        )}{" "}
                      USDC On Lottery
                    </div>
                    <div className='flex mx-auto'>
                      {lotteryUSDCBalanceOnCompound &&
                        ethers.utils.formatUnits(
                          lotteryUSDCBalanceOnCompound,
                          6
                        )}{" "}
                      USDC On Compound
                    </div>
                  </div>
                </h1>
              </div>
            )}
          </div>

          <div className='flex flex-col px-2 justify-center'>
            {lotteryAddress ? (
              <>
                <button
                  className='text-xl text-green-200 font-extrabold m-5 p-4 max-w-sm bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg border-4 border-yellow-300 hover:border-green-200 transition ease-in-out duration-500'
                  onClick={() => {
                    handleAdminWithdrawETH()
                  }}
                >
                  Withdraw ETH
                </button>
                <button
                  className='text-xl text-green-200 font-extrabold m-5 p-4 max-w-sm bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg border-4 border-yellow-300 hover:border-green-200 transition ease-in-out duration-500'
                  // onClick={async () => {
                  //   await handleAdminWithdrawETH()
                  // }}
                >
                  Mint LTK
                </button>

                <button
                  className='text-xl text-green-200 font-extrabold m-5 p-4 max-w-sm bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg border-4 border-yellow-300 hover:border-green-200 transition ease-in-out duration-500'
                  onClick={() => {
                    handleAdminFundLotteryAndApproveAndSupplyCompound()
                  }}
                >
                  Fund Lottery USDC & Supply Compound
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
