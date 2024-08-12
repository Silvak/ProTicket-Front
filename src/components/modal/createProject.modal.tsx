import { FaPlus } from 'react-icons/fa'
import { CreateProjectForm } from '../form/createProject.form'
import { CustomModal } from './customModal'

export const CreateProjectModal = () => {
  return (
    <CustomModal
      header={<h2 className="text-xl font-semibold">Crear Rifa</h2>}
      buttonText="Crear"
      buttonType="create"
      buttonIcon={<FaPlus />}
    >
      <CreateProjectForm />
    </CustomModal>
  )
}
