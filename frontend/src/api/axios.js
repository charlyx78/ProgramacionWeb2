import axios from 'axios'
import {ENDPOINT} from '../constants/endpoint.js'

const instance = axios.create({
  baseURL: ENDPOINT + '/api',
  withCredentials: true
})

export default instance