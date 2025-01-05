import { useProjectStore } from '@/store'
import { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
//import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
import { FaArrowRightLong } from 'react-icons/fa6'
import { FiPlus } from 'react-icons/fi'
import { IoRemoveCircleOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { UserSelect } from '../form/userSelect'

interface CreateProjectFormProps {
  modalAutoClose: () => void
}

interface FormData {
  name: string
  startDate: string
  endDate: string
  image: File | null
  priceTicket: string
  totalTickets: string
  perTicket: string
  qrPosition: string
  numberPosition: string
  state: string
  orientation: string
  prizesList: { [key: string]: string }[]
}

export const CreateProjectForm = ({ modalAutoClose }: CreateProjectFormProps) => {
  const [formStage, setFormStage] = useState(1)
  const [newPrize, setNewPrize] = useState({
    newKey: '',
    newValue: '',
  })

  const [formData, setFormData] = useState<FormData>({
    name: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    image: null as File | null,
    priceTicket: '0',
    totalTickets: '100',
    perTicket: '1',
    qrPosition: 'bl',
    numberPosition: 'tl',
    state: 'ACTIVE',
    orientation: 'portrait',
    // prizes
    prizesList: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const createProject = useProjectStore((state) => state.createProject)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleChangePrize = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewPrize({
      ...newPrize,
      [e.target.name]: e.target.value,
    })
  }

  const handlePrizeAdd = () => {
    const newObj = { [newPrize.newKey]: newPrize.newValue }

    // Verifica si ya existe una clave igual en el arreglo `prizesList`
    setFormData((prevFormData) => {
      const keyExists = prevFormData.prizesList.some((item) => Object.prototype.hasOwnProperty.call(item, newPrize.newKey))

      if (keyExists) {
        // Si la clave ya existe, no se agrega el nuevo objeto
        alert('La clave ya existe en la lista de premios')
        return prevFormData // No actualiza el estado
      }

      // Si la clave no existe, agrega el nuevo objeto
      return {
        ...prevFormData,
        prizesList: [...prevFormData.prizesList, newObj],
      }
    })
  }

  const handlePrizeRemove = (keyToRemove: string) => {
    setFormData((prevFormData) => {
      const updatedPrizesList = prevFormData.prizesList.filter((item) => !Object.prototype.hasOwnProperty.call(item, keyToRemove))

      return {
        ...prevFormData,
        prizesList: updatedPrizesList,
      }
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

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId)
    //console.log('Selected User ID:', userId)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

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
        orientation: formData.orientation,
        prizesList: formData.prizesList,
      },
      state: [formData.state],
      owner: {
        id: selectedUser,
      },
      image: formData.image,
    }

    try {
      await createProject(projectData)
      toast.success('Proyecto creado exitosamente')

      // clean form
      setFormData({
        name: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        image: null,
        priceTicket: '0',
        totalTickets: '100',
        perTicket: '1',
        qrPosition: 'bl',
        numberPosition: 'tl',
        state: 'ACTIVE',
        orientation: 'portrait',
        prizesList: [],
      })
      setSelectedUser(null)
      modalAutoClose()
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : 'Error al intentar crear la rifa'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="relative h-[580px]">
        <div className="flex justify-between items-center w-full mb-6">
          <button
            type="button"
            className={`w-full rounded-l-full ${formStage === 1 ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => {
              setFormStage(1)
            }}
          >
            1
          </button>

          <button
            type="button"
            className={`w-full ${formStage === 2 ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => {
              setFormStage(2)
            }}
          >
            2
          </button>

          <button
            type="button"
            className={`w-full rounded-r-full ${formStage === 3 ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => {
              setFormStage(3)
            }}
          >
            3
          </button>
        </div>

        <div className="flex text-md mb-4 font-semibold">
          <span className="mr-1 ">{formStage}.</span>
          {formStage === 1 && <h2>Configuración general</h2>}
          {formStage === 2 && <h2>Establecer premios</h2>}
          {formStage === 3 && <h2>Disposición visual</h2>}
        </div>

        {/* STAGE 1 */}
        {formStage === 1 && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium">Nombre *</label>
              <input
                type="text"
                name="name"
                placeholder="Nombre de la  Rifa"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Imagen</label>
              <input type="file" name="image" onChange={handleFileChange} className="w-full mt-1 p-2 border border-gray-300 rounded" required />
            </div>

            <div className="flex justify-between w-full mb-4">
              <div className="w-full">
                <label className="block text-sm font-medium">Fecha de Inicio *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full h-[42px] mt-1 p-2 border border-gray-300 rounded-y rounded-l"
                  required
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium">Fecha de Finalización *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full h-[42px] mt-1 p-2 border-y border-r border-gray-300 rounded-y rounded-r"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between w-full">
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium">Precio Ticket $ *</label>
                <input
                  type="number"
                  name="priceTicket"
                  placeholder="Precio ticket en dolares"
                  value={formData.priceTicket}
                  onChange={handleChange}
                  className="w-full h-[42px] mt-1 p-2 border-l border-y border-gray-300 rounded-l"
                  min="0"
                  required
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium">Tickets por Rifa</label>
                <select
                  name="perTicket"
                  value={formData.perTicket}
                  onChange={handleChange}
                  className="w-full h-[42px] mt-1 p-2 border border-gray-300 rounded-r"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>

            <div className="mb-4 w-full">
              <label className="block text-sm font-medium">Total de Tickets *</label>
              <input
                type="number"
                name="totalTickets"
                placeholder="Numero de Tickets"
                value={formData.totalTickets}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                min="0"
                required
              />
            </div>
          </>
        )}

        {/* STAGE 2 */}
        {formStage === 2 && (
          <>
            <div className="flex w-full">
              <label className="block text-sm font-medium w-[26%]">Número</label>
              <label className="block text-sm font-medium w-[70%]">Premio</label>
            </div>

            <div className="flex item-center mb-2 mt-1 w-full">
              <input
                type="text"
                name="newKey"
                placeholder="Premio 1"
                value={newPrize.newKey}
                onChange={handleChangePrize}
                className="w-[30%]  p-2 border-l border-y border-gray-300 rounded-l outline-none"
              />

              <input
                type="text"
                name="newValue"
                placeholder="Carro 0km"
                value={newPrize.newValue}
                onChange={handleChangePrize}
                className="w-[80%] p-2 border-l border-y border-gray-300 outline-none "
              />
              <button
                type="button"
                onClick={handlePrizeAdd}
                className="flex justify-center items-center text-white min-w-[42px] h-[42px] bg-green-500 rounded-r text-xl"
              >
                <FiPlus />
              </button>
            </div>

            <ul className="flex flex-col w-full h-[330px] border border-gray-300  rounded-md  overflow-y-scroll">
              {formData.prizesList.map((prize) => (
                <li key={Math.random()}>
                  {Object.entries(prize).map(([key, value]) => (
                    <div key={key} className="flex w-full items-center justify-between border-b border-gray-300  pl-2">
                      <div>
                        <span>{key}</span>:<span className="pl-1">{value}</span>
                      </div>
                      <button
                        type="button"
                        className="flex justify-center items-center text-red-600 min-w-[42px] h-[42px]  text-xl"
                        onClick={() => handlePrizeRemove(key)}
                      >
                        <IoRemoveCircleOutline />
                      </button>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* STAGE 3 */}
        {formStage === 3 && (
          <>
            <div className="mb-6 mt-2">
              <h2 className="text-sm font-semibold mb-1">Propietario de la rifa</h2>
              <UserSelect onSelect={handleUserSelect} />
              <div className="flex items-center h-[40px] w-full border-x border-b rounded-b">
                {selectedUser && <p className="text-sm text-gray-500 rounded-md px-3 mt-1">Usuario ID: {selectedUser}</p>}
              </div>
            </div>

            <label className="block text-sm font-medium mb-1">Posición del Número</label>
            <div className="flex mb-4 w-full">
              <select
                disabled
                name="numberPosition"
                value={formData.numberPosition}
                onChange={handleChange}
                className="w-[85%]  p-2 border border-gray-300 rounded bg-gray-100/80 text-gray-400"
              >
                <option value="bl">Inferior Izquierda</option>
                <option value="br">Inferior Derecha </option>
                <option value="tl">Superior Izquierda</option>
                <option value="tr">Superior Derecha</option>
              </select>

              <div className="flex justify-center items-center px-2 w-[15%]">
                <div
                  className={`${
                    formData.orientation === 'portrait'
                      ? 'relative h-[40px] w-[30px] border-t-8 border border-gray-600'
                      : 'relative h-[30px] w-[44px] border-l-8 border border-gray-600'
                  }`}
                >
                  {' '}
                </div>
              </div>
            </div>

            <label className="block text-sm font-medium mb-1">Posición del QR</label>
            <div className="flex mb-4 w-full">
              <select name="qrPosition" value={formData.qrPosition} onChange={handleChange} className="w-[85%] p-2 border border-gray-300 rounded">
                <option value="bl">Inferior Izquierda</option>
                <option value="br">Inferior Derecha</option>
                <option value="tl">Superior Izquierda</option>
                <option value="tr">Superior Derecha</option>
              </select>

              <div className="flex justify-center items-center px-2 w-[15%]">
                <div
                  className={`${
                    formData.orientation === 'portrait'
                      ? 'relative h-[40px] w-[30px] border-t-8 border border-gray-600'
                      : 'relative h-[30px] w-[44px] border-l-8 border border-gray-600'
                  }`}
                >
                  {formData.qrPosition === 'bl' && <div className="absolute bottom-[1px] left-[1px] bg-gray-600 w-[12px] h-[12px]"> </div>}
                  {formData.qrPosition === 'br' && <div className="absolute bottom-[1px] right-[1px] bg-gray-600 w-[12px] h-[12px]"> </div>}
                  {formData.qrPosition === 'tl' && <div className="absolute top-[1px] left-[1px] bg-gray-600 w-[12px] h-[12px]"> </div>}
                  {formData.qrPosition === 'tr' && <div className="absolute top-[1px] right-[1px] bg-gray-600 w-[12px] h-[12px]"> </div>}
                </div>
              </div>
            </div>

            {/* orientation */}
            <label className="block text-sm font-medium">Orientación</label>
            <div className="flex w-full mt-1">
              <select name="orientation" value={formData.orientation} onChange={handleChange} className="w-[85%] p-2 border border-gray-300 rounded">
                <option value="portrait">⬆️ Vertical</option>
                <option value="landscape">➡️ Horizontal</option>
              </select>

              <div className="flex justify-center items-center px-2 w-[15%]">
                {formData.orientation === 'portrait' ? (
                  <div className="h-[40px] w-[30px] border-t-8 border border-gray-600"> </div>
                ) : (
                  <div className="h-[30px] w-[44px] border-l-8 border border-gray-600"> </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="flex w-full absolute bottom-0">
          {formStage !== 3 && (
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-gray-200  rounded-lg mt-4"
              onClick={() => formStage < 3 && setFormStage(formStage + 1)}
            >
              Siguiente
              <span className="mt-[2px]">
                <FaArrowRightLong />
              </span>
            </button>
          )}

          {formStage === 3 && (
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg mt-4">
              {isLoading ? (
                <span className="flex justify-center items-center gap-2 ">
                  Creando Rifa
                  <span className=" mt-[2px] animate-spin ">
                    <AiOutlineLoading3Quarters />
                  </span>
                </span>
              ) : (
                'Crear Rifa'
              )}
            </button>
          )}
        </div>
      </form>
    </>
  )
}
