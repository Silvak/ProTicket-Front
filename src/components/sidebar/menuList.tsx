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

//
export const adminMenu = [
  {
    icon: <PiUsersBold />,
    text: 'Usuarios',
    url: '',
    submenu: [
      { icon: <MdOutlineAreaChart />, text: 'Overview', url: 'a' },
      { icon: <IoIosSearch />, text: 'Buscar', url: 'b' },
    ],
  },
  {
    icon: <LuTicket />,
    text: 'Proyectos',
    url: '',
    submenu: [
      { icon: <MdOutlineAreaChart />, text: 'Overview', url: 'a' },
      { icon: <IoIosSearch />, text: 'Buscar', url: 'b' },
    ],
  },
  {
    icon: <AiOutlineNotification />,
    text: 'Notificacion',
    url: '',
    submenu: [
      { icon: <MdOutlineAreaChart />, text: 'Overview', url: 'a' },
      { icon: <IoIosSearch />, text: 'Buscar', url: 'b' },
      { icon: <MdOutlineEmail />, text: 'Correo', url: 'b' },
    ],
  },
  {
    icon: <TbDatabase />,
    text: 'Base de datos',
    url: '',
    submenu: [
      { icon: <MdOutlineDataObject />, text: 'Modelo', url: 'a' },
      { icon: <IoIosSearch />, text: 'Buscar', url: 'b' },
    ],
  },
  {
    icon: <MdOutlineBugReport />,
    text: 'Reportes',
    url: '',
    submenu: [
      { icon: <MdOutlineAreaChart />, text: 'Overview', url: 'a' },
      { icon: <IoIosSearch />, text: 'Buscar', url: 'b' },
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
