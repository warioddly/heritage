import {theme} from "@/core/styles/theme";


type TextButtonProps = {
    text: any;
    onClick?: () => void;
    href?: string;
    className?: string;
}


export default function TextButton({ text, onClick, href, className }: TextButtonProps) {
    return (
        <a
            onClick={onClick}
            href={href ? href : "#"}
            className={`${theme.typography.primary} py-2 px-4 rounded border ${theme.border.color} hover:${theme.button.primaryHover} hover:${theme.typography.hover} ${theme.backgroundBlur} hover:border-blue-700 ${className}`}>
            {text}
        </a>
    )
}
