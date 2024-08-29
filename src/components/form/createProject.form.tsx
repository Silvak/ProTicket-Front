import { useProjectStore } from '@/store'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { UserSelect } from '../form/userSelect'

export const CreateProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    priceTicket: '',
    totalTickets: '',
    perTicket: '1',
    qrPosition: 'bl',
    numberPosition: 'bl',
    state: 'ACTIVE',
  })
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const createProject = useProjectStore((state) => state.createProject)

  // logic
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId)
    console.log('Selected User ID:', userId)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const projectData = {
      id: ' ',
      name: formData.name,
      date: {
        start: formData.startDate,
        end: formData.endDate,
      },
      raffleConfig: {
        img: '',
        priceTicket: Number(formData.priceTicket),
        totalTickets: Number(formData.totalTickets),
        perTicket: Number(formData.perTicket),
        qrPosition: formData.qrPosition,
        numberPosition: formData.numberPosition,
      },
      state: [formData.state],
      owner: {
        id: selectedUser,
      },
    }

    try {
      await createProject(projectData)
      toast.success('Proyecto creado exitosamente')
      // clean form
      setFormData({
        name: '',
        startDate: '',
        endDate: '',
        priceTicket: '',
        totalTickets: '',
        perTicket: '1',
        qrPosition: 'bl',
        numberPosition: 'bl',
        state: 'ACTIVE',
      })
      setSelectedUser(null)
    } catch (_error) {
      toast.error('Error al crear el proyecto')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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

        <div className="flex justify-between w-full gap-4">
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium">Fecha de Inicio</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4 w-full">
            <label className="block text-sm font-medium">Fecha de Finalización</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 w-full">
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium">Precio por Ticket</label>
            <input
              type="number"
              name="priceTicket"
              value={formData.priceTicket}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4 w-full">
            <label className="block text-sm font-medium">Total de Tickets</label>
            <input
              type="number"
              name="totalTickets"
              value={formData.totalTickets}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Tickets por Rifa</label>
          <select
            name="perTicket"
            value={formData.perTicket}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4">Seleccionar Usuario</h2>
          <UserSelect onSelect={handleUserSelect} />
          {selectedUser && <p>Usuario seleccionado: {selectedUser}</p>}
        </div>

        <div className="flex justify-between gap-4 w-full">
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium">Posición del QR</label>
            <select
              name="qrPosition"
              value={formData.qrPosition}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="bl">Inferior Izquierda</option>
              <option value="br">Inferior Derecha</option>
              <option value="tl">Superior Izquierda</option>
              <option value="tr">Superior Derecha</option>
            </select>
          </div>

          <div className="mb-4 w-full">
            <label className="block text-sm font-medium">Posición del Número</label>
            <select
              name="numberPosition"
              value={formData.numberPosition}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="bl">Inferior Izquierda</option>
              <option value="br">Inferior Derecha</option>
              <option value="tl">Superior Izquierda</option>
              <option value="tr">Superior Derecha</option>
            </select>
          </div>
        </div>

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
