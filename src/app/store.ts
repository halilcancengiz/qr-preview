import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../services/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import themeReducer from '../features/themeSlice';

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch)