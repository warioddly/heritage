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
            className={`text-${theme.typography.primary} py-2 px-4 rounded border border-${theme.colors.border} hover:bg-${theme.button.primaryHover} hover:text-${theme.typography.hover} ${theme.backgroundBlur} hover:border-blue-700 ${className}`}>
            {text}
        </a>
    )
}
