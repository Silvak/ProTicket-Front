import type React from 'react'
import { type ReactNode, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

interface CustomModalProps {
  header: ReactNode
  children: ReactNode
  buttonText: string
  buttonType: 'create' | 'delete' | 'update'
  buttonIcon?: ReactNode
}

export const CustomModal: React.FC<CustomModalProps> = ({
  header,
  children,
  buttonText,
  buttonType,
  buttonIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  // buttons styles
  const buttonStyles = {
    create: 'bg-green-500 hover:bg-green-600',
    delete: 'bg-red-500 hover:bg-red-600',
    update: 'bg-yellow-500 hover:bg-yellow-600',
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={`flex items-center px-4 py-2 text-white rounded ${buttonStyles[buttonType]}`}
      >
        {buttonIcon && <span className="mr-2">{buttonIcon}</span>}
        {buttonText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>{header}</div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  <IoMdClose />
                </button>
              </div>
            </div>
            <div className="p-4">{children}</div>
          </div>
        </div>
      )}
    </>
  )
}
