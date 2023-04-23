import {baseUrl} from '@/utils/env'


import axios from 'axios';


const service = new axios.create({
    baseURL:baseUrl,
    timeout:5000,
})

export default  service