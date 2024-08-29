import { LuTicket } from 'react-icons/lu'
import { PiUsersBold } from 'react-icons/pi'
import { TbDeviceAnalytics } from 'react-icons/tb'

//
export const adminMenu = [
  {
    icon: <TbDeviceAnalytics />,
    text: 'Estadísticas',
    url: 'overview',
    submenu: [],
  },
  {
    icon: <LuTicket />,
    text: 'Proyectos',
    url: 'projects',
    submenu: [],
  },
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
    icon: <TbDeviceAnalytics />,
    text: 'Estadísticas',
    url: 'overview',
    submenu: [],
  },
  {
    icon: <LuTicket />,
    text: 'Rifas',
    url: 'projects',
    submenu: [],
  },
  {
    icon: <PiUsersBold />,
    text: 'Vendedores',
    url: 'resellers',
    submenu: [
      /* { icon: <IoIosSearch />, text: "Buscar", url: "users/search" },*/
    ],
  },
]

//
export const resellerMenu = [
  {
    icon: <PiUsersBold />,
    text: 'Overview',
    url: 'overview',
    submenu: [],
  },
  {
    icon: <LuTicket />,
    text: 'Rifas',
    url: 'projects',
    submenu: [],
  },
]
