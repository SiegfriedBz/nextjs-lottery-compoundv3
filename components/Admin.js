import { ethers } from "ethers"
import { useState } from "react"

export default function Admin({
  admin,
  lotteryAddress,
  lotteryETHBalance,
  handleAdminFundLotteryAndApproveAndSupplyCompound,
  handleAdminWithdrawETH,
  onAdminMint,
}) {
  const [mintAmount, setMintAmount] = useState(0)

  const handleAdminMint = async (e) => {
    e.preventDefault()
    await onAdminMint(mintAmount)
    setMintAmount(0)
  }
  return (
    <div>
      <div className='flex justify-center'>
        <div className='m-5 p-6 max-w-sm bg-gradient-to-r from-violet-900 to-violet-700 rounded-lg border-2 border-t-pink-500 border-r-yellow-300 border-b-yellow-300 border-l-pink-500  hover:border-r-green-200  hover:border-b-green-200 transition ease-in-out duration-300 shadow-md'>
          <h1 className='mb-2 pb-2 text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
            Admin
          </h1>
          <div className='flex justify-center'>
            {admin && (
              <div className='flex flex-col p-2 justify-center align-middle'>
                <h1 className=' mx-auto pb-2 text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
                  {admin.slice(0, 4)}...
                  {admin.slice(38, 42)}
                </h1>

                <h1 className='my-2 mx-auto pb-2 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
                  <div className='flex flex-col'>
                    <div className='flex mx-auto'>Lottery Balance</div>
                    <div className='flex mx-auto'>
                      {lotteryETHBalance &&
                        ethers.utils.formatEther(lotteryETHBalance)}{" "}
                      ETH
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

                <form
                  onSubmit={handleAdminMint}
                  className='p-2 rounded-lg border-2 border-yellow-300 hover:border-green-200 transition ease-in-out duration-500'
                >
                  <div className='flex flex-col ms-2 align-middle'>
                    <label
                      htmlFor='amount'
                      className='text-center mb-2 mx-auto pb-2 text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'
                    >
                      LTK Amount
                    </label>
                    <input
                      id='amount'
                      className='bg-white border border-pink-500 text-pink-500 text-lg text-center font-bold rounded-lg focus:border-pink-300 block w-full p-2.5'
                      value={mintAmount}
                      onChange={(e) => {
                        setMintAmount(e.target.value)
                      }}
                    ></input>
                    <button
                      type='submit'
                      className='text-xl text-green-200 font-extrabold m-5 p-4 max-w-sm bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg border-4 border-yellow-300 hover:border-green-200 transition ease-in-out duration-500'
                    >
                      Mint LTK
                    </button>
                  </div>
                </form>
                <button
                  className='text-xl text-green-200 font-extrabold m-5 p-4 max-w-sm bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg border-4 border-yellow-300 hover:border-green-200 transition ease-in-out duration-500'
                  onClick={() => {
                    handleAdminFundLotteryAndApproveAndSupplyCompound()
                  }}
                >
                  Fund Lottery <br />& Supply Compound
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
