import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import UpdatePassword from "../../User/UpdatePassword";
import ForgotPassword from "../../User/ForgotPassword";

// ================= REGISTER USER =================
export const register = createAsyncThunk(
  "user/register",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// ================= LOGIN USER =================
export const login = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// ================= LOAD USER =================
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/profile");

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "load failed, plz try again"
      );
    }
  }
);

// ================= LOGOUT =================
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/logout",{withCredentials:true});

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/v1/profile/update",
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);

//================ UPDATE PASSWORD =================
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/v1/password/update",
        passwordData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password update failed"
      );
    }
  }
);

//forgot Password

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/password/forgot",
        email,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password forgot failed"
      );
    }
  }
);

//reset password

export const resetPassword = createAsyncThunk(
  "user/forgotPassword",
  async ({token, userData}, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/v1/reset/${token}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password forgot failed"
      );
    }
  }
);

// ================= INITIAL STATE =================
const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  success: false,
  message: null,
};

// ================= SLICE =================
const userSlice = createSlice({
  name: "user",

  initialState:{
    user:null,
    loading:false,
    error:null,
    success:false,
    isAuthenticated:false
  },

  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },

    removeSuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    // ================= REGISTER =================

    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = Boolean(action.payload?.user);
      state.user = action.payload?.user || null;
      state.success = action.payload.success;
      state.error=null;
      console.log(state.user)

    });

    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || 'something went wrong';
      state.isAuthenticated = false;
      state.user=null;
    });

    // ================= LOGIN =================

    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = Boolean(action.payload?.user);
      state.user = action.payload?.user || null;
      state.success = action.payload.success;
      state.error=null;
      console.log(state.user)

    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || 'something went wrong';
      state.isAuthenticated = false;
      state.user=null;
    });

    // ================= LOAD USER =================

    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = Boolean(action.payload?.user);
      state.user = action.payload?.user || null;
      state.error=null;
      console.log(state.user)
    });

    builder.addCase(loadUser.rejected, (state) => {
      state.loading = false;
      state.error = action.payload.message || 'load failed, plz try again';
      state.isAuthenticated = false;
      state.user=null;
    });

    // ================= LOGOUT =================

    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = action.payload?.user || null;
      state.error=null;
      console.log(state.user)
    });

    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || 'logout failed, plz try again';
    });

    
// ================= UPDATE PROFILE =================
builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success || null;
      state.user = action.payload?.user || null;
      state.error=null;
      state.message = action.payload?.message || null;
      console.log(state.user)
    });

    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || 'Profile update failed, plz try again';
    });
  },
});

//update password
builder.addCase(updatePassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(UpdatePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success || null;
      state.user = action.payload?.user || null;
      state.error=null;
      state.message = action.payload?.message || null;
      console.log(state.user)
    });

    builder.addCase(UpdatePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || 'Password update failed, plz try again';
    });
  
    //forgot password
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success || null;
      state.user = action.payload?.user || null;
      state.error=null;
      state.message = action.payload?.message || null;
      console.log(state.user)
    });

    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || 'forgot Password update failed, plz try again';
    });


        //reset password
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success || null;
      state.user = null;
      state.error=null;
      state.isAuthenticated=false;
      console.log(state.user)
    });

    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || 'email send failed';
    });




export const { removeErrors, removeSuccess } = userSlice.actions;

export default userSlice.reducer;