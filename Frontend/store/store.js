import { createStore, combineReducers, applyMiddleware } from "redux";
import RoomReducer from "./reducers/Rooms";
import ThemeReducer from "./reducers/CurrentTheme";
import AuthReducer from "./reducers/Auth";
import ReduxThunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userPersistConfig = {
  key: "user",
  storage: AsyncStorage,
  blacklist: ["password"],
};

const rootReducer = combineReducers({
  room: RoomReducer,
  CurrentTheme: ThemeReducer,
  user: persistReducer(userPersistConfig, AuthReducer),
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
export const persistor = persistStore(store);
