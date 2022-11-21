import { FaLinkedinIn, FaGithub } from "react-icons/fa"
import Footer from "./Footer"
import Navbar from "./Navbar"

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
