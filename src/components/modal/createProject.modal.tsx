import { FaPlus } from 'react-icons/fa'
import { CustomModal } from './customModal'

export const CreateProjectModal = () => {
  return (
    <CustomModal
      header={<h2 className="text-xl font-semibold">Crear Rifa</h2>}
      buttonText="Crear"
      buttonType="create"
      buttonIcon={<FaPlus />}
    >
      <p>This is the modal content for creating an item.</p>
    </CustomModal>
  )
}
