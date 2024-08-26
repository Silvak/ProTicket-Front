import { useAuthStore, useProjectStore, useTicketStore } from '@/store'
import { useState } from 'react'
import { toast } from 'react-toastify'
//import { UserSelect } from "./userSelect";

export const CreateTicketForm = () => {
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    dni: '',
    phone1: '',
    phone2: '',
    address: '',
    other: '',
  })
  //const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const userId = useAuthStore((state) => state.user?.id)
  const selectedProjectId = useProjectStore((state) => state.selectedProject?.id)
  const createTicket = useTicketStore((state) => state.createTicket)

  // logic
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const ticketData = {
      number: formData.number,
      project: selectedProjectId || '',
      seller: userId || '',
      ownerData: {
        name: formData.name,
        dni: formData.dni,
        phone1: formData.phone1,
        phone2: formData.phone2,
        address: formData.address,
        other: formData.other,
      },
    }

    try {
      await createTicket(ticketData)
      toast.success('Ticket creado exitosamente')
      // clean form
      setFormData({
        number: '',
        name: '',
        dni: '',
        phone1: '',
        phone2: '',
        address: '',
        other: '',
      })
      //setSelectedUser(null);
    } catch (_error) {
      toast.error('Error al crear el ticket!')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Numero</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">CI</label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            placeholder="cedula de identidad"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex gap-4 justify-between mb-4">
          <div className="w-full">
            <label className="block text-sm font-medium">Telefono 1</label>
            <input
              type="text"
              name="phone1"
              value={formData.phone1}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium">Telefono 2</label>
            <input
              type="text"
              name="phone2"
              value={formData.phone2}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Direccion</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Otro</label>
          <input
            type="text"
            name="other"
            value={formData.other}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>

        {/*
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4">Seleccionar Usuario</h2>
          <UserSelect onSelect={handleUserSelect} />
          {selectedUser && <p>Usuario seleccionado: {selectedUser}</p>}
        </div>
        */}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded mt-4"
        >
          Crear Proyecto
        </button>
      </form>
    </>
  )
}
