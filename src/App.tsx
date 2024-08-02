import { AppRouter } from '@/routes/router'
//import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  /*
  const { pathname } = useLocation();
  if (pathname === "/") {
    return <Navigate to="/" />;
  }
  */

  return (
    <main>
      <Router>
        <Suspense fallback={<p>loading</p>}>
          <AppRouter />
        </Suspense>
      </Router>
    </main>
  )
}

export default App
