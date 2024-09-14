import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { CreateProjectForm } from '../form/createProject.form'
import { CustomModal } from './customModal'

export const CreateProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const modalAutoClose = () => {
    setIsOpen(true)
  }

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false)
    }
  }, [isOpen])

  return (
    <CustomModal
      header={<h2 className="text-xl font-semibold">Crear Nueva Rifa</h2>}
      buttonText="Nueva Rifa"
      buttonType="create"
      buttonIcon={<FaPlus />}
      autoClose={isOpen}
    >
      <CreateProjectForm modalAutoClose={modalAutoClose} />
    </CustomModal>
  )
}
