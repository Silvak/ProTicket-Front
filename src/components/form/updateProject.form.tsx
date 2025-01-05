import type { ProjectProp } from '@/contracts'
import { useProjectStore } from '@/store'
import { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
//import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
//import { FaArrowRightLong } from 'react-icons/fa6'
import { FiPlus } from 'react-icons/fi'
import { IoRemoveCircleOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { UserSelect } from '../form/userSelect'

interface UpdateProjectFormProps {
  project: ProjectProp
}

export const UpdateProjectForm = ({ project }: UpdateProjectFormProps) => {
  const [formStage, setFormStage] = useState(1)
  const [newPrize, setNewPrize] = useState({
    newKey: '',
    newValue: '',
  })

  const [formData, setFormData] = useState({
    name: project.name || '',
    startDate: project.date?.start || '',
    endDate: project.date?.end || '',
    image: null as File | null,
    priceTicket: project.raffleConfig?.priceTicket || '',
    totalTickets: project.raffleConfig?.totalTickets || '',
    perTicket: project.raffleConfig?.perTicket || '1',
    qrPosition: project.raffleConfig?.qrPosition || 'bl',
    numberPosition: project.raffleConfig?.numberPosition || 'bl',
    state: project.state?.[0] || 'ACTIVE',
    orientation: project.raffleConfig?.orientation || '',
    prizesList: project.raffleConfig?.prizesList || [],
  })

  //console.log('Project:', project)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string | null>(project.owner.id || null)
  const updateProject = useProjectStore((state) => state.updateProject)

  useEffect(() => {
    setFormData({
      name: project.name || '',
      startDate: project.date?.start.toString() || '',
      endDate: project.date?.end.toString() || '',
      image: null as File | null,
      priceTicket: project.raffleConfig?.priceTicket || '',
      totalTickets: project.raffleConfig?.totalTickets || '',
      perTicket: project.raffleConfig?.perTicket || '1',
      qrPosition: project.raffleConfig?.qrPosition || 'bl',
      numberPosition: project.raffleConfig?.numberPosition || 'bl',
      state: project.state?.[0] || 'ACTIVE',
      orientation: project.raffleConfig?.orientation || '',
      prizesList: project.raffleConfig?.prizesList || [],
    })
    setSelectedUser(project.owner.id || null)
  }, [project])

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
    console.log('Selected User ID:', userId)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const updatedProjectData = {
      id: project.id as string,
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
      await updateProject(updatedProjectData)
      toast.success('Proyecto actualizado exitosamente')
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : 'Error al intentar crear el usuario'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="relative h-[700px]">
        <div className="flex justify-between items-center w-full mb-6">
          <button
            type="button"
            className={`w-full rounded-l-full ${formStage === 1 ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => {
              setFormStage(1)
            }}
          >
            Genral
          </button>

          <button
            type="button"
            className={`w-full rounded-r-full ${formStage === 2 ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => {
              setFormStage(2)
            }}
          >
            Premios & Layout
          </button>
        </div>

        {formStage === 1 && (
          <>
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
              <label className="block text-sm font-medium">Imagen</label>
              <input type="file" name="image" onChange={handleFileChange} className="w-full mt-1 p-2 border border-gray-300 rounded" />
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

            <div className="mb-6 mt-2">
              <h2 className="text-sm font-semibold mb-1">Propietario de la rifa</h2>
              <UserSelect onSelect={handleUserSelect} />
              <div className="flex items-center h-[40px] w-full border-x border-b rounded-b">
                {selectedUser && <p className="text-sm text-gray-500 rounded-md px-3 mt-1">Usuario seleccionado: {selectedUser}</p>}
              </div>
            </div>
          </>
        )}

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

            <ul className="flex flex-col w-full h-[230px] border border-gray-300  rounded-md  overflow-y-scroll mb-6">
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

        <div className="flex w-full absolute bottom-0">
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md mt-4">
            {isLoading ? (
              <span className="flex justify-center items-center gap-2 ">
                Actualizamdo Rifa
                <span className=" mt-[2px] animate-spin ">
                  <AiOutlineLoading3Quarters />
                </span>
              </span>
            ) : (
              'Actualizar Rifa'
            )}
          </button>
        </div>
      </form>
    </>
  )
}
