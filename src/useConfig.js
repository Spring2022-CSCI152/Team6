import axios from './axios'
import { useState, useEffect } from 'react';

axios.interceptors.request.use(
    config => {
        // const { origin } = new URL(config.url);
        // const allowedOrigins = [apiUrl];
        const token = localStorage.getItem('token');
        // if (allowedOrigins.includes(origin)) {
        config.headers.authorization = `Bearer ${token}`;
        //console.log(config)
        // }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);