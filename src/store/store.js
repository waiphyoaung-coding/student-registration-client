import { configureStore } from '@reduxjs/toolkit'
import studentSlice from '../slice/StudentSlice'

export const store = configureStore({
    reducer:{
        student: studentSlice,
    }
})
