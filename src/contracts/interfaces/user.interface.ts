export interface User {
  _id: string
  name: string
  email: string
  rol: string
  colorbg: string
  colorText: string
  uid: string
}

export interface UserID extends User {}
