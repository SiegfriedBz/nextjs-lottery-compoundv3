import { ConnectButton } from "web3uikit"

export default function Navbar() {
  return (
    <div className='flex justify-between px-5 sticky top-0 z-50 bg-white'>
      <h1 className='flex mb-2 py-3 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300 to-'>
        Win2Gether Lottery
      </h1>
      <div className='flex my-auto'>
        <ConnectButton className='flex' moralisAuth={false} />
      </div>
    </div>
  )
}
