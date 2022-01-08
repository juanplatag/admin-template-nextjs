import { MoonIcon, SunIcon } from "../icons";

interface ButtonAlterThemeProps {
    theme: string
    alterTheme: () => void
}

export default function ButtonAlterTheme(props: ButtonAlterThemeProps){

    return(
        props.theme === 'dark' ? (
            <div
                onClick={props.alterTheme}
                className={`
                    cursor-pointer
                    hidden
                    sm:flex
                    items-center
                    bg-gradient-to-r from-yellow-400 to-yellow-700
                    w-12
                    lg:w-24
                    h-8
                    p-1
                    rounded-full
                `}    
            >
                <div className={`
                    flex
                    items-center
                    justify-center
                    bg-white
                    text-yellow-600
                    w-6
                    h-6
                    rounded-full
                `}>
                    {SunIcon(4)}
                </div>

                <div className={`
                    hidden
                    lg:flex
                    items-center
                    ml-4
                    text-white
                `}>
                    <span>Day</span>
                </div>
            </div>
        ) : (
            <div
                onClick={props.alterTheme}
                className={`
                    cursor-pointer
                    hidden
                    sm:flex
                    items-center
                    justify-end
                    bg-gradient-to-r from-gray-600 to-gray-900
                    w-12
                    lg:w-24
                    h-8
                    p-1
                    rounded-full
                `}    
            >
                <div className={`
                    hidden
                    lg:flex
                    items-center
                    mr-2
                    text-gray-400
                `}>
                    <span>Night</span>
                </div>
                <div className={`
                    flex
                    items-center
                    justify-center
                    bg-black
                    text-blue-600
                    w-6
                    h-6
                    rounded-full
                `}>
                    {MoonIcon(4)}
                </div>

            </div>
        )
    )

}