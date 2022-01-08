import useAppData from "../../data/hook/useAppData";
import ButtonAlterTheme from "./ButtonAlterTheme";
import Title from "./Title";
import UserAvatar from "./UserAvatar";

interface TopBarProps {
    title: string
    caption: string
}

export default function TopBar(props: TopBarProps){

    const {theme, alterTheme} = useAppData();

    return(
        <div className={`
            flex

        `}>
            <Title
                title={ props.title }
                caption={ props.caption }
            />
            <div className={`
                flex
                flex-grow
                justify-end
                items-center
            `}>
                <ButtonAlterTheme theme={theme} alterTheme={alterTheme}/>
                <UserAvatar className="ml-5" />
            </div>
        </div>
    )

}