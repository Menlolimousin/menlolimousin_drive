import { combineReducers } from "redux";
import { authState } from "types/auth";
import { DriveState } from "types/drive";
import { userState } from "types/user";
import authReducer from "./reducers/authReducer";
import driveReducer from "./reducers/driveReducer";
import userReducer from "./reducers/userReducer";

export interface AppState {
  drive: DriveState;
  auth: authState;
  user: userState;
}

const rootReducer = combineReducers<AppState>({
  drive: driveReducer,
  auth: authReducer,
  user: userReducer,
});
export default rootReducer;
