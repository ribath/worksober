/* eslint-disable no-underscore-dangle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AppState from '../interfaces/AppState';
import { postUser, fetchUsers, fetchUserById, deleteUserById, updateUserbyId } from '../networkCalls/soberApis';
import { getFileFromBase64 } from '../utilities/helper';

const initialState: AppState = {
  loading: false,
  isAdd: true,
  imgUrl: '',
  delId: '',
  _id: '',
  name: '',
  email: '',
  age: 0,
  sex: 'male',
  adress1: '',
  adress2: '',
  member: false,
  profilePic: null,
  profilePicThumbnail: null,
  allUser: []
};

export const getAllUsers = createAsyncThunk(
  'soberApis/gerUsers',
  async () => {
    let response:any;
    try {
      response = await fetchUsers();
    } catch (err) {
      console.log(err);
    }
    return response.data.result;
  }
);

export const getUserById = createAsyncThunk(
  'soberApis/getUserById',
  async (id:string) => {
    let response:any;
    try {
      response = await fetchUserById(id);
    } catch (err) {
      console.log(err);
    }
    return response.data.result[0];
  }
);

export const createUser = createAsyncThunk(
  'soberApis/createUser',
  async (state: AppState) => {
    let response: any;
    try {
      let imageFile = new File([''], 'avatar');
      if (state.profilePic !== null) {
        imageFile = await getFileFromBase64(state.profilePic.toString('base64'), 'avatar');
        response = await postUser(state.name,
          state.email,
          state.age,
          state.sex,
          state.adress1,
          state.adress2,
          state.member,
          imageFile);
        response = await fetchUsers();
      }
    } catch (err) {
      console.log(err);
    }
    return response.data.result;
  }
);

export const updateUser = createAsyncThunk(
  'soberApis/updateUser',
  async (state: AppState) => {
    let response: any;
    try {
      let imageFile = new File([''], 'avatar');
      if (state.profilePic !== null) {
        imageFile = await getFileFromBase64(Buffer.from(state.profilePic).toString('base64'), 'avatar');
        response = await updateUserbyId(state._id,
          state.name,
          state.email,
          state.age,
          state.sex,
          state.adress1,
          state.adress2,
          state.member,
          imageFile);
        response = await fetchUsers();
      }
    } catch (err) {
      console.log(err);
    }
    return response.data.result;
  }
);

export const deleteUser = createAsyncThunk(
  'soberApis/delUserById',
  async (id:string) => {
    let response:any;
    try {
      response = await deleteUserById(id);
    } catch (err) {
      console.log(err);
    }
    return response;
  }
);

export const userSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    toggleIsAdd: (state, action) => {
      state.isAdd = action.payload;
    },
    changeImage: (state, action) => {
      state.imgUrl = action.payload;
    },
    addDelId: (state, action) => {
      state.delId = action.payload;
    },
    replaceName: (state, action) => {
      state.name = action.payload;
    },
    replaceEmail: (state, action) => {
      state.email = action.payload;
    },
    replaceAge: (state, action) => {
      state.age = action.payload;
    },
    replaceSex: (state, action) => {
      state.sex = action.payload;
    },
    replaceAdress1: (state, action) => {
      state.adress1 = action.payload;
    },
    replaceAdress2: (state, action) => {
      state.adress2 = action.payload;
    },
    toggleMember: (state) => {
      state.member = !state.member;
    },
    replaceProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
    replaceProfilePicThumbnail: (state, action) => {
      state.profilePicThumbnail = action.payload;
    },
    resetForm: (state) => {
      state.isAdd = true;
      state.imgUrl = '';
      state._id = '';
      state.name = '';
      state.email = '';
      state.age = 0;
      state.sex = 'male';
      state.adress1 = '';
      state.adress2 = '';
      state.member = false;
      state.profilePic = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUser = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdd = false;
        state.imgUrl = '';
        state._id = action.payload._id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.age = action.payload.age;
        state.sex = action.payload.sex;
        state.adress1 = action.payload.adress1;
        state.adress2 = action.payload.adress2;
        state.member = action.payload.member;
        state.profilePic = action.payload.profilePic;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        if (typeof state.delId === 'string') {
          state.allUser = state.allUser.filter((user) => user._id !== state.delId);
          state.delId = '';
        }
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.allUser = action.payload;
        userSlice.caseReducers.resetForm(state);
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.allUser = action.payload;
        userSlice.caseReducers.resetForm(state);
      });
  }
});

export const {
  toggleIsAdd,
  changeImage,
  addDelId,
  replaceName,
  replaceEmail,
  replaceAge,
  replaceSex,
  replaceAdress1,
  replaceAdress2,
  toggleMember,
  replaceProfilePic,
  replaceProfilePicThumbnail,
  resetForm
} = userSlice.actions;

export default userSlice.reducer;
