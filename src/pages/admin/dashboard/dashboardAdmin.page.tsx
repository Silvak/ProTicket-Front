import { Sidebar } from '@/components'
import { Outlet } from 'react-router-dom'

export const DashboardAdminPage = () => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>

      <div className="flex w-full h-[100vh] bg-gray-200 ">
        <Outlet />
      </div>
    </div>
  )
}
