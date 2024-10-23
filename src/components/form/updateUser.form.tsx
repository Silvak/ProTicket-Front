import type { UserProp } from '@/contracts'
import { useUserStore } from '@/store'
import { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import { toast } from 'react-toastify'

interface UpdateUserFormProps {
  user: UserProp
}

export const UpdateUserForm = ({ user }: UpdateUserFormProps) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    img: user.img || '',
    state: user.state.toString(), // Asegúrate de que sea un string
    image: null as File | null,
  })

  const updateUser = useUserStore((state) => state.updateUser)

  useEffect(() => {
    setFormData({
      name: user.name || '',
      phone: user.phone || '',
      img: user.img || '',
      state: user.state.toString(), // Asegúrate de que sea un valor escalar
      image: null as File | null,
    })
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Asegúrate de que el value es el valor correcto
    }))
  }

  const handlePhoneChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: `+${value}`,
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

    const userData = {
      id: user.id,
      name: formData.name,
      phone: formData.phone,
      img: formData.img,
      state: formData.state,
      image: formData.image,
    }

    try {
      await updateUser(userData)
      toast.success('Usuario actualizado exitosamente')
    } catch (_error) {
      toast.error('Error al actualizar el usuario')
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

        <div className="mb-4">
          <label className="block text-sm font-medium">Imagen</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex gap-4 justify-between mb-4">
          <div className="w-full">
            <label className="block text-sm font-medium">Teléfono</label>
            <PhoneInput
              country={'ve'}
              value={formData.phone}
              onChange={(value) => handlePhoneChange(value, 'phone')}
              inputClass="phoneInput"
              inputProps={{
                name: 'phone',
                required: true,
              }}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Estado</label>
          <select
            name="state"
            value={formData.state} // Asegúrate de que sea un string
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          >
            <option value="ACTIVE">Activo</option>
            <option value="SUSPENDED">Inactivo</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md mt-4"
        >
          Actualizar Usuario
        </button>
      </form>
    </>
  )
}
