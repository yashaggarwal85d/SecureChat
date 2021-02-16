import { createStore, combineReducers, applyMiddleware } from "redux";
import RoomReducer from "./reducers/Rooms";
import AuthReducer from "./reducers/Auth";
import ReduxThunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  room: RoomReducer,
  user: AuthReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
export const persistor = persistStore(store);
