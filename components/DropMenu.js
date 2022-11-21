import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import Link from "next/link"

export default function DropMenu() {
  const activeClass =
    "flex px-2 py-1 text-2xl italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-violet-400"
  const defaultClass =
    "flex px-2 py-1 text-2xl italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-violet-500"

  return (
    <Menu as='div' className='inline-block text-left mb-2'>
      <Menu.Button className='inline-flex w-auto justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-700s'>
        <div className='space-y-2'>
          <div className='w-10 h-1 bg-violet-600'></div>
          <div className='w-10 h-1 bg-violet-600'></div>
          <div className='w-10 h-1 bg-violet-600'></div>
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='pt-1 right-0 z-10 w-full origin-top-right rounded-md bg-transparent'>
          <div className=''>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href='/getStarted'
                  className={active ? activeClass : defaultClass}
                >
                  Get Started
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href='/etherscanLinks'
                  className={active ? activeClass : defaultClass}
                >
                  Etherscan
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href='/admin'
                  className={active ? activeClass : defaultClass}
                >
                  Admin
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
