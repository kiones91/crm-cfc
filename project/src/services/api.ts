import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // deve virar http://localhost:3333
})
// ...
export default api
