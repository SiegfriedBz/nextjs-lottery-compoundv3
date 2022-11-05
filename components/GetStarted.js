import GetButton from "./GetButton"

export default function GetStarted({ lotteryTokenAddress, usdcAddress }) {
  return (
    <div className='flex flex-col align-middle justify-center'>
      <h1 className='mb-2 pb-2 text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
        Get Started
      </h1>
      <div className='flex flex-col align-middle justify-center lg:flex-row'>
        {lotteryTokenAddress && (
          <a
            href='https://metamask.io/download/'
            target='_blank'
            rel='noreferrer'
          >
            <GetButton>Add MetaMask</GetButton>
          </a>
        )}
        <a href='https://faucets.chain.link/' target='_blank' rel='noreferrer'>
          <GetButton>Get Goerli ETH</GetButton>
        </a>
        <a href='https://app.uniswap.org/' target='_blank' rel='noreferrer'>
          <GetButton>Get Goerli USDC</GetButton>
        </a>
      </div>
    </div>
  )
}
