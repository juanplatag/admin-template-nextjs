
import Head from "next/head"
import Image from "next/image"
import Router from "next/router"
import LoadingGif from "../../../public/images/loading.gif"
import useAuth from "../../data/hook/useAuth"

export default function ForceAuth(props){

    const { user, loading } = useAuth()

    function renderContent(){
        return(
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!document.cookie?.includes("admin-template-catholicday-auth")){
                                    window.location.href = "/authentication"
                                }
                            `
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function renderLoading(){
        return(
            <div className={`
                flex
                justify-center
                items-center
                h-screen
            `}>
                <Image src={LoadingGif} alt="Loading application..."/>
            </div>
        )
    }

    if(!loading && user?.email){
        return renderContent()
    } else if (loading) {
        return renderLoading()
    } else {
        Router.push('/authentication')
        return null
    }
}