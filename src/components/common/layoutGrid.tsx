import type { ReactNode } from 'react'
import type React from 'react'
interface LayoutProps {
  children: ReactNode
}

export const LayoutGrid: React.FC<LayoutProps> = ({ children }) => {
  return <div className="layout">{children}</div>
}
