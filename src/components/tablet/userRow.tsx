import { useProjectStore } from '@/store'

import { AiOutlineDelete } from 'react-icons/ai'
//import { FaRegEdit } from "react-icons/fa";
//import { LuUser2 } from 'react-icons/lu'
import { MdOutlineDashboard } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CustomModal } from '../modal/customModal'

interface UserRowProp {
  id: string
  name: string
  email: string
  role: string[]
  state: string[]
}

export const UserRow = ({ id, name, email, role, state }: UserRowProp) => {
  const navigate = useNavigate()
  const deleteProject = useProjectStore((state) => state.deleteProject)

  const handleDelete = async () => {
    try {
      await deleteProject(id)
      toast.success('Proyecto eliminado exitosamente.')
    } catch (_error) {
      toast.error('Hubo un error al eliminar el proyecto.')
    }
  }

  return (
    <>
      <div className="grid  grid-cols-1 lg:grid-cols-5 border-b p-4 gap-y-2 xl:gap-0">
        {/* project info */}
        <div className="flex gap-2 col-span-1 lg:col-span-2 overflow-hidden">
          <div className="h-[64px] w-[64px]  bg-gray-200 rounded-md overflow-hidden">
            <img
              src="https://www.tarjetasinnovadoras.com/wp-content/uploads/2023/11/BOLETAS-RIFA-4x0-F4.webp"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold">{name}</h2>
            <p className="text-sm text-gray-400">ID: {id}</p>
            <p className="text-sm text-gray-400">ID: {email}</p>
          </div>
        </div>

        {/* tickets */}
        <div className="flex items-center">
          <label className="flex lg:hidden mr-2">Total Tickets:</label>
          <div className="px-2 py-1 text-white bg-slate-900 rounded-md">{role}</div>
        </div>

        {/* state */}
        <div className="flex items-center">
          <label className="flex lg:hidden mr-2">Estado:</label>
          <div className="bg-green-700/50 px-4 p-1 rounded-full">
            <p className="text-sm font-bold">{state}</p>
          </div>
        </div>

        {/* actions */}
        <div className="flex items-center justify-end gap-2 col-span-1 lg:col-span-1 mt-6 lg:mt-0">
          <button
            type="button"
            onClick={() => navigate(`details/${id}`)}
            className="flex justify-center items-center h-[42px] min-w-[42px] w-full lg:w-min border rounded-md hover:bg-gray-300"
          >
            <MdOutlineDashboard />
          </button>

          {/*
          <button
            type="button"
            onClick={() => deleteProject(id)}
            className="flex justify-center items-center h-[42px] min-w-[42px] w-full lg:w-min border rounded-md hover:bg-gray-300"
          >
            <AiOutlineDelete />
          </button>
          */}

          <CustomModal
            header={<h2>Confirmar Eliminación</h2>}
            buttonText=""
            buttonType="delete"
            buttonIcon={<AiOutlineDelete />}
          >
            <p>¿Estás seguro de que deseas eliminar el proyecto "{name}"?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Confirmar
              </button>
            </div>
          </CustomModal>
        </div>
      </div>
    </>
  )
}
