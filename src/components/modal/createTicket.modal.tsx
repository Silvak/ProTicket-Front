import { FaPlus } from 'react-icons/fa'
import { CreateTicketForm } from '../form/createTicket.form'
import { CustomModal } from './customModal'

export const CreateTicketModal = () => {
  return (
    <CustomModal
      header={<h2 className="text-xl font-semibold">Crear Ticket</h2>}
      buttonText="Crear"
      buttonType="create"
      buttonIcon={<FaPlus />}
    >
      <CreateTicketForm />
    </CustomModal>
  )
}
