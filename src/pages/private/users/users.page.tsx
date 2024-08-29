import { LayoutGrid, UsersTablet } from '@/components'
import type { UserProp, UserResponse } from '@/contracts'
import { useUserStore } from '@/store'
import { useEffect, useState } from 'react'

export const UsersPage = () => {
  const data = useUserStore((state) => state.data as UserResponse)
  const getUser = useUserStore((state) => state.getUser)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getUser()
  }, [getUser])

  const filteredUsers = data.users?.filter((user) =>
    user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!data || !Array.isArray(data.users)) {
    return <div>Loading...</div>
  }
  return (
    <LayoutGrid>
      <div className="bg-white border border-gray-300 rounded-md h-[42px] p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-xl font-bold">USUARIOS</h1>
      </div>

      <div className="bg-white border border-gray-300 rounded-md  p-2 col-span-1 sm:col-span-2 md:col-span-5 xl:col-span-10">
        <input
          type="text"
          placeholder="Buscar proyectos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-full p-2"
        />
      </div>

      <div className="bg-white border border-gray-300 rounded-md  p-2 col-span-1 sm:col-span-2 md:col-span-1 xl:col-span-2">
        Create User
      </div>

      <UsersTablet
        limit={data.limit}
        page={data.page}
        users={(filteredUsers || []) as UserProp[]}
        total={data.total}
      />
    </LayoutGrid>
  )
}
