import { ConnectButton } from "web3uikit"

export default function Navbar() {
  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between px-5 sticky top-0 z-20 bg-gradient-to-r from-pink-500 to-yellow-300'>
        <h1 className='flex mb-2 py-3 text-3xl italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300'>
          Pool2Gether
        </h1>
        <div className='flex mb-5 flex-end sm:my-auto'>
          <ConnectButton moralisAuth={false} />
        </div>
      </div>
    </>
  )
}
