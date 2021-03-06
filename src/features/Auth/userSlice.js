import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import Storagekeys from "constant/storage-keys";

export const register = createAsyncThunk('users/register',
    async (payload) => {
      const data = await userApi.register(payload);
      localStorage.setItem(Storagekeys.TOKEN, data.jwt);
      localStorage.setItem(Storagekeys.USER, JSON.stringify(data.user));
      return data.user;
    }
  )
  export const login = createAsyncThunk('users/login',
  async (payload) => {
    const data = await userApi.login(payload);
    localStorage.setItem(Storagekeys.TOKEN, data.jwt);
    localStorage.setItem(Storagekeys.USER, JSON.stringify(data.user));
    return data.user;
  }
)



const userSlice = createSlice({
    name: 'user',
    initialState:{
        current:JSON.parse(localStorage.getItem(Storagekeys.USER)) || {},
        // current:{},
        setting:{},
    }
    ,
    reducers: {
      logout(state) {
        localStorage.removeItem(Storagekeys.USER);
        localStorage.removeItem(Storagekeys.TOKEN);
        state.current = {};
      }
    },
    extraReducers:{
        [register.fulfilled]:(state,action) => {
            state.current=action.payload;
        },
        [login.fulfilled]:(state,action) => {
            state.current=action.payload;
        },
    },
});


const {actions, reducer} = userSlice;
export const { logout } = actions;
export default reducer; //default export