
import Router from 'next/router'
import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import firebase from '../../firebase/config'
import User from '../../model/User'

interface AuthContextProps{
    user?: User
    loading?: boolean
    register?: (email: string, password: string) => Promise<void>
    login?: (email: string, password: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>

}

const AuthContext = createContext<AuthContextProps>({})

async function normalizedUser(userFirebase: firebase.User): Promise<User>{
    const token = await userFirebase.getIdToken()
    return{
        uid: userFirebase.uid,
        name: userFirebase.displayName,
        email: userFirebase.email,
        token,
        provider: userFirebase.providerData[0].providerId,
        imageUrl: userFirebase.photoURL
    }
}

function manageCookie(logged: boolean){
    if (logged){
        Cookies.set('admin-template-catholicday-auth', logged, {
            expires: 7
        })
    } else {
        Cookies.remove('admin-template-catholicday-auth')
    }
}

export function AuthProvider(props){

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User>(null)

    async function configureSession(userFirebase){
        if (userFirebase?.email){
            const user = await normalizedUser(userFirebase)
            setUser(user)
            manageCookie(true)
            setLoading(false)
            return user.email
        } else {
            setUser(null)
            manageCookie(false)
            setLoading(false)
            return false
        }
    }

    async function register(email, password){
        try {
            setLoading(true)
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
            
            await configureSession(response.user) 
            Router.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function login(email, password){
        try {
            setLoading(true)
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)
            
            await configureSession(response.user) 
            Router.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function loginGoogle(){
        try {
            setLoading(true)
            const response = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
            
            configureSession(response.user) 
            Router.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function logout(){
        try{
            setLoading(true)
            await firebase.auth().signOut()
            await configureSession(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (Cookies.get('admin-template-catholicday-auth')){
            const cancel = firebase.auth().onIdTokenChanged(configureSession)
            return () => cancel()
        } else {
            setLoading(false)
        }
    }, [])

    return(
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                loginGoogle,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthContext