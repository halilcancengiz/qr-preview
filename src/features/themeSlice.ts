// src/features/themeSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface IThemeState {
    theme: string | undefined
}

const initialState: IThemeState = {
    theme: undefined
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<string | undefined>) => {
            state.theme = action.payload
        },
    },
})

export const { changeTheme } = themeSlice.actions
export default themeSlice.reducer
