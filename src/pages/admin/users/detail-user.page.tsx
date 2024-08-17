import { LayoutGrid } from '@/components'

export const DetailUserPage = () => {
  return (
    <LayoutGrid>
      <div className="bg-white border border-gray-300 rounded-md h-[42px] p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-xl font-bold">User Overview</h1>
      </div>

      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        Editar Usuario
      </div>
    </LayoutGrid>
  )
}
