import axios from "axios";

const token = localStorage.getItem('auth') ? localStorage.getItem('auth').replace(/"/g, '') : ''
export default axios.create(
  {

    baseURL: `http://${process.env.REACT_APP_MY_URL}`,
    headers: {
      "Content-type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  });