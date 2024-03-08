import { configureStore } from '@reduxjs/toolkit'
import queryReducer from './querySlice'
import { iRentalApi } from './apiSlice'

export default configureStore({
  reducer: {
    query: queryReducer,
    [iRentalApi.reducerPath]: iRentalApi.reducer
  },

   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(iRentalApi.middleware),
})
