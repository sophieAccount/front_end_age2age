import axios from "axios";
import { useAuthContext } from "./Context/AuthProvider";
import {api_url} from './env/config.js'

const token = localStorage.getItem('auth') ? localStorage.getItem('auth').replace(/"/g, '') : ''
export default axios.create(
  {

    baseURL: `https://${api_url}`,
    headers: {
      "Content-type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  });