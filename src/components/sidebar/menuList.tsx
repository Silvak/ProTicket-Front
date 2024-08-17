import { IoIosSearch } from 'react-icons/io'
import { LuTicket } from 'react-icons/lu'
import { MdOutlineAreaChart } from 'react-icons/md'
import { PiUsersBold } from 'react-icons/pi'
import { TbDeviceAnalytics } from 'react-icons/tb'

//
export const adminMenu = [
  {
    icon: <TbDeviceAnalytics />,
    text: 'Overview',
    url: 'overview',
    submenu: [],
  },
  {
    icon: <LuTicket />,
    text: 'Proyectos',
    url: 'projects',
    submenu: [],
  },

  //
  {
    icon: <PiUsersBold />,
    text: 'Usuarios',
    url: 'users',
    submenu: [
      /* { icon: <IoIosSearch />, text: "Buscar", url: "users/search" },*/
    ],
  },
]

//
export const userMenu = [
  {
    icon: <PiUsersBold />,
    text: 'Dashboard',
    url: '',
    submenu: [
      { icon: <MdOutlineAreaChart />, text: 'Overview', url: 'a' },
      { icon: <IoIosSearch />, text: 'Buscar', url: 'b' },
    ],
  },
]

//
export const sellerMenu = [
  {
    icon: <PiUsersBold />,
    text: 'Dashboard',
    url: '',
    submenu: [
      { icon: <MdOutlineAreaChart />, text: 'Overview', url: 'a' },
      { icon: <IoIosSearch />, text: 'Buscar', url: 'b' },
    ],
  },
]
