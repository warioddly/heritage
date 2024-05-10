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
                p-2
                text-sm
                text-${theme.typography.primary}
                ${theme.border.radius}
                hover:text-${theme.typography.hover}
                hover:bg-${theme.button.primaryHover}
                focus:text-white
                ${theme.backgroundBlur}
                border-${theme.colors.border}
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
