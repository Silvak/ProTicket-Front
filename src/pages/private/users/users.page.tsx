import { LayoutGrid, UsersTablet } from '@/components'
//import type { UserProp, UserResponse } from '@/contracts'
//import { useAuthStore, useUserStore } from '@/store'
//import { useEffect, useState } from 'react'

export const UsersPage = () => {
  return (
    <LayoutGrid>
      <div className="bg-white border border-gray-300 rounded-md h-[42px] p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-xl font-bold">USUARIOS</h1>
      </div>

      <div className="bg-white border border-gray-300 rounded-md  p-2 col-span-1 sm:col-span-2 md:col-span-1 xl:col-span-2">
        Create User
      </div>

      <UsersTablet />
    </LayoutGrid>
  )
}
