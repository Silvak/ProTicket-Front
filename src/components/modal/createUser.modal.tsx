import { useModalAutoClose } from '@/hooks'
import { useUserRole } from '@/hooks/useUserRole'
import { FaPlus } from 'react-icons/fa'
import { CreateResellerForm } from '../form/createReseller.form'
import { CreateUserForm } from '../form/createUser.form'
import { CustomModal } from './customModal'

export const CreateUserModal = () => {
  const userRole = useUserRole()
  const { isOpen, modalAutoClose } = useModalAutoClose()

  return (
    <CustomModal
      header={<h2 className="text-xl font-semibold">Crear Nuevo {userRole === 'admin' ? 'Usuario' : 'Revendedor'}</h2>}
      buttonText={`Crear ${userRole === 'admin' ? 'Usuario' : 'Revendedor'}`}
      buttonType="create"
      buttonIcon={<FaPlus />}
      autoClose={isOpen}
    >
      {userRole === 'admin' ? <CreateUserForm modalAutoClose={modalAutoClose} /> : <CreateResellerForm modalAutoClose={modalAutoClose} />}
    </CustomModal>
  )
}
