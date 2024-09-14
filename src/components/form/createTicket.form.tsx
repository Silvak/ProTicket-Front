import { useAuthStore, useProjectStore, useTicketStore } from '@/store'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface ProjectStatusProp {
  collected: number
  goal: number
  pending: number
  sold: number
  grid: {
    number: string
    ticket: string
    status: string
  }[]
}

export const CreateTicketForm = ({ ticketNumber = '' }) => {
  const [formData, setFormData] = useState({
    number: ticketNumber !== '' ? ticketNumber : '',
    name: '',
    dni: '',
    phone1: '',
    phone2: '',
    address: '',
    other: '',
  })

  const [searchTerm, setSearchTerm] = useState('')
  const getStatus = useProjectStore((state) => state.getStatus)
  const status = useProjectStore((state) => state.status as ProjectStatusProp)
  const userId = useAuthStore((state) => state.user?.id)
  const selectedProjectId = useProjectStore((state) => state.selectedProject?.id)
  const createTicket = useTicketStore((state) => state.createTicket)

  useEffect(() => {
    if (selectedProjectId) {
      getStatus(selectedProjectId)
    }
  }, [getStatus, selectedProjectId])

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Filtrar los números disponibles en base al término de búsqueda
  const filteredNumbers = status?.grid
    ? status.grid.filter((item) => item.number.includes(searchTerm))
    : []

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
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            placeholder="Buscar número"
          />
          <select
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Selecciona un número</option>
            {filteredNumbers.map((item) => (
              <option key={item.number} value={item.number}>
                {item.number} - {item.status}
              </option>
            ))}
          </select>
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
            placeholder="Cédula de identidad"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex gap-4 justify-between mb-4">
          <div className="w-full">
            <label className="block text-sm font-medium">Teléfono 1</label>
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
            <label className="block text-sm font-medium">Teléfono 2</label>
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
          <label className="block text-sm font-medium">Dirección</label>
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

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded mt-4"
        >
          Agregar Ticket
        </button>
      </form>
    </>
  )
}
