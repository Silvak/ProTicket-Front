import type { TicketProp } from '@/contracts'
import { useAuthStore, useProjectStore, useTicketStore } from '@/store'
import { useState } from 'react'
import { toast } from 'react-toastify'
//import { UserSelect } from "./userSelect";

interface UpdateTicketFormProps {
  ticket: TicketProp
}

export const UpdateTicketForm = ({ ticket }: UpdateTicketFormProps) => {
  const [formData, setFormData] = useState({
    number: ticket.number || '',
    name: ticket.ownerData.name || '',
    dni: ticket.ownerData.dni || '',
    phone1: ticket.ownerData.phone1 || '',
    phone2: ticket.ownerData.phone2 || '',
    address: ticket.ownerData.address || '',
    other: ticket.ownerData.other || '',
    state: ticket.state || '',
  })
  //const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const userId = useAuthStore((state) => state.user?.id)
  const selectedProjectId = useProjectStore((state) => state.selectedProject?.id)
  const updateTicket = useTicketStore((state) => state.updateTicket)

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
      id: ticket.id,
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
      state: formData.state,
    }

    try {
      await updateTicket(ticketData)
      toast.success('Ticket actualizado exitosamente')
      //setSelectedUser(null);
    } catch (_error) {
      toast.error('Error al actualizar el ticket')
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

        <div className="mb-4">
          <label className="block text-sm font-medium">Estado</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          >
            <option value="PAID">Vendido</option>
            <option value="UNPAID">Pendiente</option>
            <option value="CANCELLED ">Cancelado</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded mt-4"
        >
          Actualizar Ticket
        </button>
      </form>
    </>
  )
}
