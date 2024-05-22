// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'

interface props {
  children?: React.ReactNode;
  className?: string
}

export function Providers({children, className}: props) {
  return (
    <NextUIProvider className={className}>
      {children}
    </NextUIProvider>
  )
}