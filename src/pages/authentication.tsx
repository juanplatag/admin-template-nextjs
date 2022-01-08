
import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { ExclamationIcon } from "../components/icons";
import useAuth from "../data/hook/useAuth";

export default function Authentication(){

    const { register, login, loginGoogle } = useAuth()

    const[error, setError] = useState(null)
    const[mode, setMode] = useState<'signin' | 'signup'>('signin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(){
        try {
            if (mode === 'signin'){
                await login(email, password)
            } else{
                await register(email, password)
            }
        } catch (error) {
            displayError(e?.message ?? 'Erro desconhecido!')
        }
    }

    function displayError(msg, time = 3){
        setError(msg)
        setTimeout(() => {
            setError(null)
        }, time * 1000);
    }

    return(
        <div className={`
            flex
            h-screen
            items-center
            justify-center
        `}>
            <div className={`
                w-1/2
                hidden
                md:block
                lg:w-2/3
            `}>
                <img
                    src="https://source.unsplash.com/random"
                    alt="Auth Image Screen"
                    className={`
                        h-screen
                        w-full
                        object-cover
                    `}
                />
            </div>
            <div className={`
                m-10
                w-full
                md:w-1/2
                lg:w-1/3
            `}>
                <h1 className={`
                    text-2xl
                    font-bold
                    mb-5
                `}>
                    {mode === 'signin' ? 'Entre com a sua Conta' : 'Cadastre-se na Plataforma'}
                </h1>
                {error ? (
                    <div className={`
                        flex
                        items-center
                        bg-red-400
                        text-white
                        py-3
                        px-5
                        my-2
                        border
                        border-red-600
                        rounded-lg
                    `}>
                        {ExclamationIcon()}
                        <span className={`ml-2`}>{error}</span>
                    </div>
                ): false}
                <AuthInput
                    label="Email"
                    type="email"
                    value={email}
                    valueChanged={setEmail}
                    required
                />
                <AuthInput
                    label="Senha"
                    type="password"
                    value={password}
                    valueChanged={setPassword}
                    required
                />
                <button
                    onClick={submit}
                    className={`
                        w-full
                        bg-indigo-500
                        hover:bg-indigo-400
                        text-white
                        rounded-lg
                        px-4
                        py-3
                        mt-6
                    `}
                >
                    {mode === 'signin' ? 'entrar com o email' : 'entrar com o email'}
                </button>
                <hr
                    className={`
                        my-6
                        border-gray-300
                    `}
                />
                <button
                    onClick={loginGoogle}
                    className={`
                        w-full
                        bg-red-500
                        hover:bg-red-400
                        text-white
                        rounded-lg
                        px-4
                        py-3
                    `}
                >
                    {mode === 'signin' ? 'entrar com o google' : 'entrar com o google'}
                </button>
                {mode === 'signin' ? (
                    <p className={`
                        mt-8
                    `}>
                        Novo por aqui?
                        <a onClick={() => setMode('signup')} className={`
                            text-blue-500 
                            hover:text-blue-700
                            cursor-pointer
                        `}> Crie uma conta Gratuitamente</a>
                    </p>
                ) : (
                    <p className={`
                        mt-8
                    `}>
                        Já faz parte da nossa comunidade?
                        <a onClick={() => setMode('signin')} className={`
                            text-blue-500 
                            hover:text-blue-700
                            cursor-pointer
                        `}> Entre com as suas Credenciais</a>
                    </p>
                )}
            </div>
        </div>
    )

}