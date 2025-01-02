import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/events'; 

// Async Thunks
export const fetchAllEvents = createAsyncThunk('events/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL);
    return response.data.events;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchAdminEvents = createAsyncThunk('events/fetchAdminEvents', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/my-events`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data.events;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const createEvent = createAsyncThunk('events/create', async (eventData, thunkAPI) => {
  try {
    const response = await axios.post(API_URL, eventData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.event;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const updateEvent = createAsyncThunk('events/update', async ({ eventId, updatedData }, thunkAPI) => {
  try {
    const response = await axios.put(`${API_URL}/${eventId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.event;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteEvent = createAsyncThunk('events/delete', async (eventId, thunkAPI) => {
  try {
    const response = await axios.delete(`${API_URL}/${eventId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data.event;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchEventById = createAsyncThunk('events/fetchEventById', async (eventId, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/${eventId}`);
    return response.data.event;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Event Slice
const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    adminEvents: [],
    currentEvent:null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch event by ID
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all events
      .addCase(fetchAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch admin events
      .addCase(fetchAdminEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.adminEvents = action.payload;
      })
      .addCase(fetchAdminEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create event
      .addCase(createEvent.fulfilled, (state, action) => {
        state.adminEvents.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false; 
        const index = state.adminEvents.findIndex(event => event._id === action.payload._id);
        if (index !== -1) {
          state.adminEvents[index] = action.payload;
        }
      })
      // Delete event
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.adminEvents = state.adminEvents.filter(
          (event) => event._id !== action.payload._id
        );
      });
  },
});

export default eventSlice.reducer;
