import type { SidebarBtn } from '@/contracts'
import { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

export const SidebarButton = ({
  isOpen,
  icon,
  text,
  url,
  submenu,
}: SidebarBtn) => {
  const navigate = useNavigate()
  const [menuIsOpen, setMenuOpen] = useState(false)

  const handleOpen = () => {
    setMenuOpen(!menuIsOpen)
  }

  return (
    <>
      {/* main button */}
      <div
        onKeyUp={() => ''}
        onKeyDown={() => navigate(url)}
        onClick={() => navigate(url)}
        className={` bg-gray-300 ${
          url !== '' && 'hover:bg-indigo-300 cursor-pointer'
        } relative flex items-center w-full h-[52px]  rounded-md pl-[5px] overflow-hidden cursor-default `}
      >
        <div className="flex justify-center items-center min-w-[42px] h-[42px] rounded-md">
          <span className="text-xl">{icon}</span>
        </div>
        <div>
          <p className={`${isOpen ? 'flex' : 'hidden'} text-nowrap`}>{text}</p>
        </div>

        {isOpen && submenu.length > 0 && (
          <button
            type="button"
            className="absolute right-3"
            onClick={handleOpen}
          >
            {menuIsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        )}
      </div>

      {/* submenu */}
      <div
        className={`w-full ${
          menuIsOpen ? 'h-min' : 'h-0'
        } overflow-hidden duration-150 ease-in-out`}
      >
        {submenu.map((element) => (
          <button
            key={element.text}
            type="button"
            onClick={() => navigate(element.url)}
            className={`  ${
              element.url !== '' && 'hover:bg-indigo-300 cursor-pointer'
            } relative flex items-center w-full h-[52px]  rounded-md pl-[5px] overflow-hidden cursor-default`}
          >
            <div className="flex justify-center items-center min-w-[42px] h-[42px] rounded-md">
              <span className="text-xl">{element.icon}</span>
            </div>

            <div>
              <p className={`${isOpen ? 'flex' : 'hidden'} text-nowrap`}>
                {element.text}
              </p>
            </div>
          </button>
        ))}
      </div>
    </>
  )
}
