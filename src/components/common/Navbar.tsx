import { useSidebarStore } from '@/store'
import { CgMenuGridO } from 'react-icons/cg'
import { NotificationButton } from './notificationButton'
import { UserButton } from './userButton'

export const Navbar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen)
  const setOpen = useSidebarStore((state) => state.setOpen)
  return (
    <header className="fixed flex w-full h-[70px] bg-white border-b border-gray-300 z-[100]">
      {/* menu button */}
      <div
        className={`flex  items-center h-full pl-2 ${
          isOpen ? 'w-[320px]' : 'min-w-[70px]'
        }  duration-150 ease-in-out`}
      >
        <button
          onClick={setOpen}
          type="button"
          className="flex justify-center items-center min-w-[52px] h-[52px] w-[52px] text-[38px] text-gray-500 rounded-md"
        >
          <CgMenuGridO />
        </button>

        <a href="/admin/overview" className="ml-2 text-xl">
          <span className="font-bold text-gray-400">PRO</span>
          <span className="font-bold">TICKET</span>
        </a>
      </div>

      <div className="flex justify-end items-center gap-2 md:gap-4 w-[calc(100vw-70px)] pr-4 ">
        {/* notification */}
        <NotificationButton />

        {/* user button */}
        <UserButton />
      </div>
    </header>
  )
}
