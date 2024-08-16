import { PiUsersBold } from 'react-icons/pi'

import { AiOutlineNotification } from 'react-icons/ai'
import { IoIosSearch } from 'react-icons/io'
import { LuTicket } from 'react-icons/lu'
import {
  MdOutlineAreaChart,
  MdOutlineBugReport,
  MdOutlineDataObject,
  MdOutlineEmail,
} from 'react-icons/md'
import { TbDatabase } from 'react-icons/tb'
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
    url: '',
    submenu: [
      {
        icon: <MdOutlineAreaChart />,
        text: 'Overview',
        url: 'projects',
      },
    ],
  },

  //
  {
    icon: <PiUsersBold />,
    text: 'Usuarios',
    url: '',
    submenu: [
      {
        icon: <MdOutlineAreaChart />,
        text: 'Overview',
        url: 'users',
      },
      { icon: <IoIosSearch />, text: 'Buscar', url: 'users/search' },
    ],
  },
  {
    icon: <AiOutlineNotification />,
    text: 'Notificación',
    url: '',
    submenu: [
      { icon: <MdOutlineAreaChart />, text: 'Overview', url: 'notification' },
      { icon: <IoIosSearch />, text: 'Buscar', url: 'notification/search' },
      { icon: <MdOutlineEmail />, text: 'Correo', url: 'notification/email' },
    ],
  },
  {
    icon: <TbDatabase />,
    text: 'Data',
    url: '',
    submenu: [
      { icon: <MdOutlineDataObject />, text: 'Modelo', url: 'data' },
      { icon: <IoIosSearch />, text: 'Buscar', url: 'data/search' },
    ],
  },
  {
    icon: <MdOutlineBugReport />,
    text: 'Reportes',
    url: '',
    submenu: [
      { icon: <MdOutlineAreaChart />, text: 'Overview', url: 'reports' },
      { icon: <IoIosSearch />, text: 'Buscar', url: 'reports/search' },
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
