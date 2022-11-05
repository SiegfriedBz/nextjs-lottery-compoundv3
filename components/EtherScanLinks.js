import GetButton from "./GetButton"

export default function EtherScanLinks({
  lotteryAddress,
  lotteryTokenAddress,
  usdcAddress,
}) {
  return (
    <div className='flex flex-col align-middle justify-center'>
      <h1 className='mb-2 pb-2 text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
        Etherscan Links
      </h1>
      <div className='flex flex-col align-middle justify-center lg:flex-row'>
        {lotteryAddress && (
          <a
            href={`https://goerli.etherscan.io/address/${lotteryAddress}`}
            target='_blank'
            rel='noreferrer'
          >
            <GetButton>Lottery contract</GetButton>
          </a>
        )}
        {lotteryTokenAddress && (
          <a
            href={`https://goerli.etherscan.io/address/${lotteryTokenAddress}`}
            target='_blank'
            rel='noreferrer'
          >
            <GetButton>LTK contract</GetButton>
          </a>
        )}
        {usdcAddress && (
          <a
            href={`https://goerli.etherscan.io/address/${usdcAddress}`}
            target='_blank'
            rel='noreferrer'
          >
            <GetButton>USDC contract</GetButton>
          </a>
        )}
      </div>
    </div>
  )
}
