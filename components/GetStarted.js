import GetButton from "./GetButton"

export default function GetStarted() {
  return (
    <div className='flex flex-col align-middle justify-center'>
      <h1 className='mb-2 pb-2 text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
        Get Started
      </h1>
      <a href='https://metamask.io/download/' target='_blank'>
        <GetButton>Get MetaMask</GetButton>
      </a>
      <div className='flex flex-col align-middle lg:flex-row lg:justify-center'>
        <a href='https://goerlifaucet.com/' target='_blank'>
          <GetButton>Get Goerli ETH</GetButton>
        </a>
        <a href='https://app.uniswap.org/' target='_blank'>
          <GetButton>Get Goerli USDC</GetButton>
        </a>
      </div>
    </div>
  )
}
