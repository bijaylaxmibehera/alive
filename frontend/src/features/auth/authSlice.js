import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api/v1/auth'

// Async Thunks
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/register/user`,
        userData
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const registerAdmin = createAsyncThunk(
  'auth/registerAdmin',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/register/admin`,
        adminData
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Google Login Thunk
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async ({ token, role, organization }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/google-login`,
        { token, role, organization },
        { withCredentials: true }
      )
      return response.data
    } catch (error) {
      console.error(
        'Google login error:',
        error.response?.data || error.message
      )
      return rejectWithValue(
        error.response?.data || { message: 'Google login failed.' }
      )
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    admin: JSON.parse(localStorage.getItem('admin') || 'null'),
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  },
  reducers: {
    logout (state) {
      state.user = null
      state.admin = null
      state.error = null
      localStorage.removeItem('admin')
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  },
  extraReducers: builder => {
    builder
      // Handle User Registration
      .addCase(registerUser.pending, state => {
        state.loading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Handle Admin Registration
      .addCase(registerAdmin.pending, state => {
        state.loading = true
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.admin = action.payload
        state.token = action.payload.token
        localStorage.setItem('admin', JSON.stringify(action.payload))
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Handle Login
      .addCase(login.pending, state => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token

        if (action.payload.role === 'user') {
          state.user = action.payload.user || null
          localStorage.setItem('user', JSON.stringify(action.payload.user))
        } else if (action.payload.role === 'admin') {
          state.admin = action.payload.admin || null
          localStorage.setItem('admin', JSON.stringify(action.payload.admin))
        }
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Handle Google Login
      .addCase(googleLogin.pending, state => {
        state.loading = true
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false
        const { user, role, token } = action.payload
        if (role === 'user') {
          state.user = user || null
          localStorage.setItem('user', JSON.stringify(user))
        } else if (role === 'admin') {
          state.admin = user || null
          localStorage.setItem('admin', JSON.stringify(user))
        }

        state.token = token
        localStorage.setItem('token', token)
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        if (action.payload.message.includes('already registered')) {
          state.error = 'Google ID is already registered as a different role.'
        }
      })
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
