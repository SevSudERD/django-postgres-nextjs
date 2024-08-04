
const {cookies} = require("next/headers")

const TOKEN_AGE = 3600
const TOKEN_NAME = "auth-token"
const TOKEN_REFRESH_NAME = "auth-refresh-token"

export function getToken(){
  //api request
  const myAuthToken =  cookies().get("auth-token")
  return myAuthToken?.value
}

export function getRefreshToken(){
  //api request
  const myAuthToken =  cookies().get(TOKEN_REFRESH_NAME)
  return myAuthToken?.value
}

export function setToken(authToken){
  //login
  return  cookies().set({
    name: TOKEN_NAME,
    value: authToken,
    httpOnly: true, // this prevent the attack client-side
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
    maxAge: TOKEN_AGE,
  })
}

export function setRefreshToken(authRefreshToken){
  //login
  return  cookies().set({
    name: TOKEN_REFRESH_NAME,
    value: authRefreshToken,
    httpOnly: true, // this prevent the attack client-side
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
    maxAge: TOKEN_AGE,
  })
}

export function deleteTokens(){
  //logout
  cookies().delete(TOKEN_REFRESH_NAME)
  return cookies().delete(TOKEN_NAME)
}