import { useAuthStore, useProjectStore, useTicketStore } from '@/store'
import { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import { toast } from 'react-toastify'
import 'react-phone-input-2/lib/style.css'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

/*
interface ProjectStatusProp {
  collected: number;
  goal: number;
  pending: number;
  sold: number;
  grid: {
    number: string;
    ticket: string;
    status: string;
  }[];
}*/

interface CreateTicketFormProps {
  ticketNumber?: string
  modalAutoClose: () => void
}

export const CreateTicketForm = ({ ticketNumber, modalAutoClose }: CreateTicketFormProps) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    dni: '',
    phone1: '',
    phone2: '',
    address: '',
    other: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  //const [searchTerm, setSearchTerm] = useState("");
  const getStatus = useProjectStore((state) => state.getStatus)
  //const status = useProjectStore((state) => state.status as ProjectStatusProp);
  const userId = useAuthStore((state) => state.user?.id)
  const selectedProjectId = useProjectStore((state) => state.selectedProject?.id)
  const createTicket = useTicketStore((state) => state.createTicket)

  const [newTicket, _setNewTicket] = useState([])

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

  /*
  const _handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar los números disponibles en base al término de búsqueda
  const _filteredNumbers = status?.grid
    ? status.grid.filter((item) => item.number.includes(searchTerm))
    : [];

  */

  const handlePhoneChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: `+${value}`,
    })
  }

  useEffect(() => {
    if (newTicket.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        number: newTicket.join(', '),
      }))
    } else if (ticketNumber) {
      setFormData((prevData) => ({
        ...prevData,
        number: ticketNumber,
      }))
    }
  }, [ticketNumber, newTicket])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const ticketToCreate = newTicket.length > 0 ? newTicket.join('-') : formData.number

    const ticketData = {
      number: ticketToCreate,
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
      modalAutoClose()
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : 'Error al intentar crear el usuario'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  /*
  const _handleTicket = () => {
    let newArr = [...newTicket];

    if (newArr.includes(formData.number)) {
      newArr = newArr.filter((item) => item !== formData.number);
    } else if (newArr.length < 4) {
      newArr.push(formData.number);
    }

    setNewTicket(newArr);

    setFormData({
      ...formData,
      number: "",
    });
  };
  */

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={() => navigate(-1)} className=" flex items-center justify-center gap-1 mb-6 bg-gray-200 rounded-md px-3 h-[42px] w-full">
          <MdArrowBackIosNew /> Volver a Inicio
        </button>

        <div className="mb-4">
          <div className="flex justify-start text-nowrap w-full lg:w-min font-semibold">
            <p>Numeros seleccionados: </p>
          </div>

          <div className="flex gap-2 mt-1">
            {formData.number.split('-').map((item) => (
              <div key={item} className="flex justify-center items-center border-2 border-green-600 h-[42px] w-[42px]  font-semibold rounded-md">
                {item}
              </div>
            ))}
          </div>
          {/* Select Numbers */}
        </div>

        <div className="flex justify-between gap-2 mb-4">
          <div className="w-full">
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="Jhon Doe"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium">CI - DNI</label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              placeholder="v-012345678"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-between mb-4 border rounded-md p-2">
          <div className="">
            <label className="block text-sm font-medium">Teléfonos</label>
            <PhoneInput
              country={'ve'}
              value={formData.phone1}
              onChange={(value) => handlePhoneChange(value, 'phone1')}
              inputClass="phoneInput"
              inputProps={{
                name: 'phone1',
                required: true,
              }}
            />
          </div>

          <div className="">
            <PhoneInput
              country={'ve'}
              value={formData.phone2}
              onChange={(value) => handlePhoneChange(value, 'phone2')}
              inputClass="phoneInput"
              inputProps={{
                name: 'phone2',
              }}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Dirección</label>
          <input
            type="text"
            name="address"
            placeholder="Calle 123, Ciudad, Estado"
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
            placeholder="Referencias, notas, etc."
            value={formData.other}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded mt-4">
          {isLoading ? (
            <span className="flex justify-center items-center gap-2 ">
              Registrando Ticket
              <span className=" mt-[2px] animate-spin ">
                <AiOutlineLoading3Quarters />
              </span>
            </span>
          ) : (
            ' Registrar Ticket'
          )}
        </button>
      </form>
    </>
  )
}

/*
          <div className="flex justify-between items-center bg-white rounded-xl  sm:col-span-2 md:col-span-6  xl:col-span-12 ">
            <div className="flex items-center justify-start  gap-1 w-full mb-1">
              <p className="text-nowrap">Numeros seleccionados: </p>
              {newTicket.map((item) => (
                <p
                  key={item}
                  className="flex justify-center items-center border-2 border-green-600 h-[32px] w-[32px]  font-semibold rounded-md"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            placeholder="⌕ Buscar número"
          />

          <div className="flex gap-1 mt-1">
            <select
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="font-mono w-full  p-2 border border-gray-300 rounded"
            >
              <option value="">Selecciona un número</option>
              {filteredNumbers.map((item) => (
                <option
                  key={item.number}
                  value={item.number}
                  className="font-mono"
                  disabled={
                    item.status === "RESERVED" ||
                    item.status === "UNPAID" ||
                    item.status === "PAID" ||
                    item.status === "WINNER"
                  }
                >
                  🎫[{String(item.number).padEnd(10, ".")}]{" "}
                  {item.status === "AVAILABLE" && "🚩 Disponible"}
                  {item.status === "RESERVED" && "🔵 Reservado"}
                  {item.status === "UNPAID" && "🟠 Pendiente"}
                  {item.status === "PAID" && "🟢 Pagado"}
                  {item.status === "WINNER" && "🏆 Ganador"}
                  {item.status === "CANCELLED" && "❌ Cancelado"}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleTicket}
              className="w-[40px] h-[40px] bg-green-500 rounded-md text-white"
            >
              +
            </button>
          </div>

*/
