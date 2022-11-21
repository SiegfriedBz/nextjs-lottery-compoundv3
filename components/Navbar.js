import { ConnectButton } from "web3uikit"
import Link from "next/link"
import DropMenu from "../components/DropMenu"

export default function Navbar() {
  const liClass =
    "flex px-2 pt-4 text-2xl italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400"

  return (
    <>
      <div className='flex flex-col lg:flex-row lg:justify-between px-5 sticky top-0 z-20 bg-gradient-to-r from-pink-500 to-yellow-300'>
        <div className='flex flex-col justify-between align-middle sm:flex-row'>
          <h1 className='flex py-3 text-3xl italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300'>
            <Link href='/'>Pool2Gether</Link>
          </h1>
          <div className='hidden sm:flex'>
            <ul className='flex flex-row justify-between lg:pl-5'>
              <li className={liClass}>
                <Link href='/getStarted'>Get Started</Link>
              </li>
              <li className={liClass}>
                <Link href='/etherscanLinks'>Etherscan</Link>
              </li>
              <li className={liClass}>
                <Link href='/admin'>Admin</Link>
              </li>
            </ul>
          </div>
          <div className='flex sm:hidden'>
            <DropMenu />
          </div>
        </div>

        <div className='flex my-2 py-2 md:flex-end md:my-auto'>
          <ConnectButton moralisAuth={false} />
        </div>
      </div>
    </>
  )
}
