import type { Project } from '@/contracts'
import type { FC } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import { LuUser2 } from 'react-icons/lu'

export const ProjectRow: FC<Project> = ({
  id,
  name,
  totalTickets,
  state,
  owner,
}) => {
  const ownerName = typeof owner === 'string' ? owner : owner.name

  return (
    <>
      <div key={id} className="grid grid-cols-7 border-b p-4">
        {/* project info */}
        <div className="flex gap-2 col-span-2 overflow-hidden">
          <div className="h-[64px] min-w-[64px]  bg-gray-200 rounded-md">
            img
          </div>
          <div>
            <h2 className="font-semibold">{name}</h2>
            <p className="text-sm text-gray-400">ID: {id}</p>
          </div>
        </div>

        {/* tickets */}
        <div className="flex items-center">
          <div className="px-2 py-1 text-white bg-slate-900 rounded-md">
            {totalTickets}
          </div>
        </div>

        {/* owner */}
        <div className="flex items-center">
          <p>
            {' '}
            <span className="">55</span>$
          </p>
        </div>

        {/* owner */}
        <div className="flex items-center">
          <div className="flex items-center gap-2 pl-2 pr-4 p-1 border w-min rounded-full">
            <div className="bg-slate-700 h-[32px] w-[32px] rounded-full text-white flex justify-center items-center">
              <LuUser2 />
            </div>
            <p className="min-w">{ownerName}</p>
          </div>
        </div>

        {/* state */}
        <div className="flex items-center">
          <div className="bg-green-700/50 px-4 p-1 rounded-full">
            <p className="text-sm font-bold">{state}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="flex justify-center items-center h-[42px] min-w-[42px] border rounded-md hover:bg-gray-300"
          >
            <FaRegEdit />
          </button>
          <button
            type="button"
            className="flex justify-center items-center h-[42px] min-w-[42px] border rounded-md hover:bg-gray-300"
          >
            <AiOutlineDelete />
          </button>
        </div>
      </div>
    </>
  )
}
