import React from 'react'
import CryptoJS from 'crypto-js';

const SECRET_KEY = '.a;yA)SNZUh+4,mHBKNd{K9_x80i-Z,5';

export const StoreToken = (token) => {
    const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString()
    localStorage.setItem('token', encryptedToken) 
}

export const retrieveToken = () => {
    const encryptedToken = localStorage.getItem('token')

    if (!encryptedToken) return null;

    return CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY).toString(CryptoJS.enc.Utf8)
}

export const removeToken = () => {
    localStorage.removeItem('token');
};
