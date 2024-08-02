import { useSidebarStore } from '@/store'
import { adminMenu } from './menuList'
import { SidebarButton } from './sidebarBtn'

export const Sidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen)

  return (
    <aside
      className={`fixed md:relative ${
        isOpen ? 'w-[320px]' : 'w-[0px] md:w-[70px]'
      } h-[calc(100vh-70px)] z-[1000] mt-[70px] bg-white border-r border-gray-300 border-l duration-150 ease-in-out overflow-hidden`}
    >
      <div className="flex flex-col gap-2 w-full h-full px-2 py-4 ">
        {adminMenu.map((element) => (
          <SidebarButton
            key={element.text}
            isOpen={isOpen}
            icon={element.icon}
            text={element.text}
            url={element.url}
            submenu={element.submenu}
          />
        ))}
      </div>
    </aside>
  )
}
