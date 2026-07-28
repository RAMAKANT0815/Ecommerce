import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      const { data } = await axios.put("/api/v1/profile/update", userData);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "load failed, plz try again"
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
  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;

export default userSlice.reducer;