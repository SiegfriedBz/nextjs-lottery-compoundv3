import { FaLinkedinIn, FaGithub } from "react-icons/fa"

export default function Footer() {
  return (
    <footer>
      <div className='px-5 grid grid-cols-6 bg-gradient-to-r from-pink-500 to-yellow-300'>
        <div className='col-span-5'>
          <h1 className='flex py-3 text-3xl italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300'>
            Powered by Pool2Gether
          </h1>
        </div>
        <div className='flex flex-end text-right'>
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
