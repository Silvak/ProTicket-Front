import { LayoutGrid } from '@/components'

export const OverviewPage = () => {
  return (
    <LayoutGrid>
      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 md:col-span-2 xl:col-span-3">
        1
      </div>
      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 md:col-span-2 xl:col-span-3">
        2
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
