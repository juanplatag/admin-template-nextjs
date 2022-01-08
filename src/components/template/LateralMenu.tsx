import useAuth from "../../data/hook/useAuth";
import { HomeIcon, LogoutIcon, NotificationIcon, SettingsIcon } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function LateralMenu(){

    const {logout} = useAuth()

    return(
        <aside className={`
            flex
            flex-col
            dark:bg-gray-900
        `}>
            <div className={`
                flex
                flex-col
                items-center
                justify-center
                bg-gradient-to-r from-indigo-600 to-purple-800
                h-20
                w-20
            `}>
                <Logo />
            </div>
            <ul className={`
                flex-grow
            `}>
                <MenuItem url="/" text="Home" icon={HomeIcon} />
                <MenuItem url="/settings" text="Settings" icon={SettingsIcon} />
                <MenuItem url="/notifications" text="Notify" icon={NotificationIcon} />
            </ul>
            <ul>
                <MenuItem
                    className={`
                        text-red-600
                        dark:text-red-400
                        hover:bg-red-400
                        hover:text-white
                        dark:hover:text-white
                    `}
                    onClick={logout}
                    text="Sair"
                    icon={LogoutIcon}
                />
            </ul>
        </aside>
    )

}