import { useAuthStore, useUserStore } from '@/store'
import { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { toast } from 'react-toastify'
//import { UserSelect } from "./userSelect";

interface CreateResellerFormProps {
  modalAutoClose: () => void
}

export const CreateResellerForm = ({ modalAutoClose }: CreateResellerFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    creatorId: '',
    image: null as File | null,
  })
  //const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false)
  const userId = useAuthStore((state) => state.user?.id)
  //const selectedProjectId = useProjectStore((state) => state.selectedProject?.id);
  const createReseller = useUserStore((state) => state.createReseller)

  // logic
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const newUserData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      image: formData.image,
      creatorId: userId || '',
    }

    try {
      await createReseller(newUserData)
      toast.success('Ticket creado exitosamente')
      // clean form
      setFormData({
        name: '',
        email: '',
        password: '',
        creatorId: '',
        image: null,
      })
      modalAutoClose()
      //setSelectedUser(null);
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : 'Error al intentar crear el usuario'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Nombre</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Correo</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="cedula de identidad"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex gap-4 justify-between mb-4">
          <div className="w-full">
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Imagen</label>
          <input type="file" name="image" onChange={handleFileChange} className="w-full mt-1 p-2 border border-gray-300 rounded" required />
        </div>

        {/*
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4">Seleccionar Usuario</h2>
          <UserSelect onSelect={handleUserSelect} />
          {selectedUser && <p>Usuario seleccionado: {selectedUser}</p>}
        </div>
        */}

        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded mt-4">
          {isLoading ? (
            <span className="flex justify-center items-center gap-2 ">
              Creando Usuario
              <span className=" mt-[2px] animate-spin ">
                <AiOutlineLoading3Quarters />
              </span>
            </span>
          ) : (
            'Crear Usuario'
          )}
        </button>
      </form>
    </>
  )
}
