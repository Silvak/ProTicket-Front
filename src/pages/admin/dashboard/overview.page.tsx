import { LayoutGrid } from '@/components'
import type { ProjectResponse, UserResponse } from '@/contracts'
import { useProjectStore, useUserStore } from '@/store'
import { useEffect } from 'react'
import { FiUsers } from 'react-icons/fi'
import { IoTicketOutline } from 'react-icons/io5'

export const OverviewPage = () => {
  const projects = useProjectStore((state) => state.data) as ProjectResponse
  const getProjects = useProjectStore((state) => state.getProjects)

  const users = useUserStore((state) => state.data as UserResponse)
  const getUser = useUserStore((state) => state.getUser)

  useEffect(() => {
    getProjects()
    getUser()
  }, [getProjects, getUser])

  return (
    <LayoutGrid>
      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 md:col-span-2 xl:col-span-3">
        <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
          <h4 className="whitespace-nowrap">Rifas Creadas</h4>
        </div>

        {/* Proyects */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex justify-center items-center text-2xl h-[48px] w-[48px] bg-slate-100 rounded-sm">
            <IoTicketOutline />
          </div>

          <div className="flex flex-col h-[48px]">
            <p className="text-xl font-bold">
              {projects.total || 0}
              <span className="text-md text-gray-400"> </span>
            </p>
            <span className="text-sm text-gray-500">rifas</span>
          </div>
        </div>
      </div>

      {/* Users */}
      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 md:col-span-2 xl:col-span-3">
        <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
          <h4 className="whitespace-nowrap">Usuarios</h4>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex justify-center items-center text-2xl h-[48px] w-[48px] bg-slate-100 rounded-sm">
            <FiUsers />
          </div>

          <div className="flex flex-col h-[48px]">
            <p className="text-xl font-bold">
              {users.total || 0}
              <span className="text-md text-gray-400"> </span>
            </p>
            <span className="text-sm text-gray-500">users</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 md:col-span-2 xl:col-span-6">
        3
      </div>

      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 md:col-span-2 xl:col-span-6">
        4
      </div>
      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 md:col-span-2 xl:col-span-3">
        5
      </div>
      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 md:col-span-2 xl:col-span-3">
        6
      </div>
    </LayoutGrid>
  )
}
