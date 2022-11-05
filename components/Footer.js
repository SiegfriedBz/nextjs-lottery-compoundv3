import { FaLinkedinIn, FaGithub } from "react-icons/fa"

export default function Footer({ lotteryAddress }) {
  return (
    <footer>
      <div className='grid grid-cols-6 px-5 bg-gradient-to-r from-pink-500 to-yellow-300'>
        <div className='col-span-5'>
          <h1 className='flex py-3 text-3xl italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300'>
            Powered by Pool2Gether
          </h1>
        </div>
        <div className='flex flex-col py-3 sm:flex-row sm:justify-around'>
          <a
            href='https://www.linkedin.com/in/siegfriedbozza/'
            className='px-3 my-auto text-purple-800'
            target='_blank'
            rel='noreferrer'
          >
            <FaLinkedinIn size={28} />
          </a>
          <a
            href='https://github.com/SiegfriedBz'
            className='px-3 my-auto text-purple-800'
            target='_blank'
            rel='noreferrer'
          >
            <FaGithub size={28} />
          </a>
        </div>
      </div>
    </footer>
  )
}
