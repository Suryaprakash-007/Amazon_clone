//importing packages
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

//importing slice of user and products
import userSlice from './userSlice';
import productsSlice from './productsSlice';

//configuring local storage
const persistConfig = {
  key: 'root',
  storage,
};

//combining user and product reducers
const rootReducer = combineReducers({
  userInfo: userSlice.reducer,
  productsList: productsSlice.reducer,
});

//adding rootreducer to persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//store to store values
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
