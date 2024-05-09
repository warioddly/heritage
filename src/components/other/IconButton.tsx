

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
                font-medium text-gray-300 rounded-lg
                focus:z-10 focus:ring-2
                hover:text-white
                hover:bg-blue-900
                focus:ring-blue-500
                focus:text-white
                bg-black
                bg-opacity-40
                backdrop-filter
                backdrop-blur-md
                border-neutral-800 border
                ${props.className}
            `}>
            <div className="flex items-center">
                {props.icon}
            </div>
        </button>
    )
}
