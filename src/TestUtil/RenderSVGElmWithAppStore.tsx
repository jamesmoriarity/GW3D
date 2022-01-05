import React, {FC, ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../app/store'

const AllTheProviders: FC = ({children}) => {
  return (
    <Provider store={store}>
        <svg>{children}</svg>
    </Provider>
  )
}
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as renderSVGElmWithAppStore}