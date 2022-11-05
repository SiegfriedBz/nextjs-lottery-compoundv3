import { FaLinkedinIn, FaGithub } from "react-icons/fa"

export default function Footer() {
  return (
    <footer>
      <div className='grid grid-cols-6 mx-5'>
        <div className='col-span-5'>
          <h1 className='p-3 text-lg text-left font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300'>
            Powered by &copy;Win2Gether Lottery
          </h1>
        </div>
        <div className='flex justify-center p-3'>
          <a
            href='https://www.linkedin.com/in/siegfriedbozza/'
            className='px-3'
            target='_blank'
          >
            <FaLinkedinIn size={28} />
          </a>
          <a href='https://github.com/SiegfriedBz' target='_blank'>
            <FaGithub size={28} />
          </a>
        </div>
      </div>
    </footer>
  )
}
