import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../../config/constants'



export interface CurrentWeather {
    city: string
    date: string
    weather: string
    temperature: string
}

export interface ForecastWeather {
    date: string
    weather: string
    temperature: string
}

export interface WeatherState {
    current: CurrentWeather
    forecast: Array<{
        day: string
        temp: number
        condition: string
    }>
    loading: boolean
    error: string | null
}

const initialState: WeatherState = {
    current: {
        city: '',
        date: '',
        weather: '',
        temperature: ''
    },
    forecast: [],
    loading: false,
    error: null
}

// **Thunks**
export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async (params: { city: string; country: string }, thunkAPI) => {
        const { city, country } = params
        try {
            const response = await axios.get(`${API_URL}/weather/current?city=${city}&country=${country}`)
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch weather data')
        }
    }
)

export const fetchForecastData = createAsyncThunk(
    'weather/fetchForecastData',
    async (params: { city: string; country: string; days: number }, thunkAPI) => {
        const { city, country, days } = params
        try {
            const response = await axios.get(`${API_URL}/weather/forecast?city=${city}&country=${country}&days=${days}`)
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch forecast data')
        }
    }
)

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // **Clima actual**
            .addCase(fetchWeatherData.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchWeatherData.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.current = {
                    city: action.payload.city,
                    date: action.payload.date,
                    weather: action.payload.weather,
                    temperature: action.payload.temperature,
                }
            })
            .addCase(fetchWeatherData.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            // **Previsión del clima**
            .addCase(fetchForecastData.pending, (state) => {
                state.loading = true
                state.error = null
                state.forecast = [] // reset forecast
            })
            .addCase(fetchForecastData.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                if (action.payload?.forecast) {
                    const today = new Date().toLocaleDateString('es-ES', { weekday: 'short' });

                    state.forecast = action.payload.forecast
                        .map((item: any) => ({
                            day: new Date(item.date).toLocaleDateString('es-ES', { weekday: 'short' }),
                            temp: parseFloat(item.temperature),
                            condition: item.weather,
                        }))
                        .filter((item: any) => item.day !== today);
                } else {
                    state.forecast = [];
                }
            })
            .addCase(fetchForecastData.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
    },
})



export default weatherSlice.reducer
