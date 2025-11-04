import axios from "axios"

// Get API base URL from environment variables with fallback
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL

if (!apiBaseUrl) {
  console.warn(
    "Warning: API_BASE_URL is not configured. API calls may fail. Please set NEXT_PUBLIC_API_BASE_URL or API_BASE_URL in your .env file."
  )
}

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance
