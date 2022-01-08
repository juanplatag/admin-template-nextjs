
interface AuthInputProps {
    label: string
    value: any
    required?: boolean
    type?: 'text' | 'email' | 'password'
    notRender?: boolean
    valueChanged: (newValue: any) => void
}

export default function AuthInput(props: AuthInputProps){

    return props.notRender ? null : (
        <div className={`
            flex
            flex-col
            mt-4
        `}>
            <label>{ props.label }</label>
            <input
                type={props.type ?? "text"}
                value={props.value}
                onChange={e => props.valueChanged?.(e.target.value)}
                required={props.required}
                className={`
                    px-4
                    py-3
                    mt-2
                    rounded-lg
                    bg-gray-200
                    focus:bg-gray-100
                    border focus:border-blue-500
                    focus:outline-none
                `}
            />
        </div>
    )

}