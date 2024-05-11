import {theme} from "@/core/styles/theme";


type IconButtonProps = {
    icon: any;
    onClick?: () => void;
    className?: string;
}


export default function IconButton(props: IconButtonProps) {

    return (
        <button
            onClick={props.onClick}
            type="button"
            className={`
                p-2 text-sm
                focus:text-white
                ${theme.typography.primary}
                ${theme.border.radius}
                hover:${theme.typography.hover}
                hover:${theme.button.primaryHover}
                ${theme.backgroundBlur}
                ${theme.border.color}
                border
                bg-black
                hover:border-blue-700
                ${props.className}
            `}>
            <div className="flex items-center">
                {props.icon}
            </div>
        </button>
    )
}
