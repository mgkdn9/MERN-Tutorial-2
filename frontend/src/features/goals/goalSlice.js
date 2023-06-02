import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

// All redux resources will have these fields
const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new goal
// goalData being passed in is just 'text' state variable in GoalForm.jsx
export const createGoal = createAsyncThunk("goals/create", async (goalData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await goalService.createGoal(goalData, token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    //calling reset just sets state of goalSlice to initial values
    //did it slightly differently in authSlice because we needed to persist the 'user'
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        //api sends back new goal as 'action.payload'
        state.goals.push(action.payload)
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
