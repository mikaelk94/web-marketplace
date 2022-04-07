import axios, { AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://verkkokauppa-api.herokuapp.com/',
})

export default axiosInstance
