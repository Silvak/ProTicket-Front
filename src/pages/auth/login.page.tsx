import { useAuthStore } from '@/store'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
  const navigate = useNavigate()
  const loginUser = useAuthStore((state) => state.loginUser)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { username, password } = event.target as typeof event.target & {
      username: { value: string }
      password: { value: string }
      remember: { checked: boolean }
    }

    try {
      await loginUser(username.value, password.value)
      navigate('/admin/overview')
      console.log(username.value, password.value)
    } catch (_error) {
      console.log('no se pudo autenticar')
    }

    //username.value = "";
    //password.value = "";
    //remember.checked = false;
  }

  return (
    <div className="relative grid place-content-center bg-gray-200 h-[100vh] w-[100vw]">
      <div className="bg-white w-[100vw] h-[100vh] md:w-[400px] md:h-min p-4 rounded-md shadow-md">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-2 w-full  mt-[45%] md:mt-0"
        >
          <h1 className="font-semibold text-xl mb-4">ProTicket</h1>

          <label>
            <span className="text-sm">Correo</span>
            <input
              type="email"
              name="username"
              autoComplete="off"
              className="w-full border rounded-md h-[42px] px-2"
            />
          </label>

          <label>
            <span className="text-sm">Contraseña</span>
            <input
              type="password"
              name="password"
              autoComplete="off"
              className="w-full border rounded-md h-[42px] px-2"
            />
          </label>

          <div className="mb-4 flex items-center">
            <input type="checkbox" name="remember" className="text-blue-500" />
            <label className="text-gray-600 ml-2">Remember Me</label>
          </div>

          <button
            type="submit"
            className="h-[42px] bg-slate-800 text-white rounded-md mt-8"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>

      <div className="flex justify-center absolute bottom-2 w-full">
        <p className="text-gray-500">
          ProTicket © {new Date().getFullYear()} Derechos Reservados.
        </p>
      </div>
    </div>
  )
}
