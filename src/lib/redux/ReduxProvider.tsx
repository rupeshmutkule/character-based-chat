"use client"
import React from 'react'
import { Provider } from "react-redux";
import store from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'





const queryClient = new QueryClient()

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default ReduxProvider