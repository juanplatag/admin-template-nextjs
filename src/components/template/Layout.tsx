import useAppData from "../../data/hook/useAppData";
import ForceAuth from "../auth/ForceAuth";
import Content from "./Content";
import LateralMenu from "./LateralMenu";
import TopBar from "./TopBar";

interface LayoutProps {
    title: string
    caption: string
    children?: any
}

export default function Layout(props: LayoutProps){

    const { theme } = useAppData()

    return(
        <ForceAuth>
            <div className={`
                ${theme}
                flex
                h-screen
                w-screen
            `}>
                <LateralMenu />
                <div className={`
                    flex
                    flex-col
                    w-full
                    p-7
                    bg-gray-300
                    dark:bg-gray-800
                `}>
                    <TopBar title={ props.title } caption={ props.caption } />
                    <Content>{ props.children }</Content>    
                </div>
            </div>
        </ForceAuth>
    )

}