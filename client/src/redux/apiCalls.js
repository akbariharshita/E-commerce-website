import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout
} from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    localStorage.setItem("accessToken", res.data.accessToken);
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
    localStorage.setItem("accessToken", res.data.accessToken);
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const Userlogout = async (dispatch) =>{
  try{
    await publicRequest.get("/auth/logout");
   dispatch(logout());
   localStorage.removeItem("accessToken");
  }catch(err){
    console.log(err);
  }
}