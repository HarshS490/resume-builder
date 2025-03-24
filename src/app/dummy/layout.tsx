import { MultiStepFormContextProvider } from '@/features/userdata/context/multistep-form-context';
import React from 'react'


function layout({children}:{children:React.ReactNode}) {
  return (
    <MultiStepFormContextProvider>
      {children}
    </MultiStepFormContextProvider>
  )
}

export default layout;