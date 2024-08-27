import { FaPlus } from 'react-icons/fa'
import { CreateHistoryForm } from '../form/createHistory.form'
import { CustomModal } from './customModal'

export const CreateHistoryModal = () => {
  return (
    <CustomModal
      header={<h2 className="text-xl font-semibold">Abonar</h2>}
      buttonText="Crear"
      buttonType="create"
      buttonIcon={<FaPlus />}
    >
      <CreateHistoryForm />
    </CustomModal>
  )
}
