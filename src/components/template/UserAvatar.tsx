
import Link from "next/link";
import useAuth from "../../data/hook/useAuth";

interface UserAvatarProps{
    className?: string
}

export default function UserAvatar(props: UserAvatarProps){

    const { user } = useAuth()

    return(
        <Link href="/perfil" passHref>
            <img
                src={user?.imageUrl ?? '/images/perfil.png'}
                alt="avatar"
                className={`
                    h-12
                    w-12
                    rounded-full
                    cursor-pointer
                    ${props.className}
                `}
            />
        </Link>
    )
}