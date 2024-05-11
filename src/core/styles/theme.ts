import {
    TailwindBlur,
    TailwindBorderRadius,
    TailwindColorWithShade
} from "@/core/types/tailwind";


type HeritageTheme = {
    colors: {
        primary: TailwindColorWithShade;
        secondary: TailwindColorWithShade;
        background: TailwindColorWithShade;
    },
    typography: {
        primary: `text-${TailwindColorWithShade}`;
        secondary: `text-${TailwindColorWithShade}`;
        hover: `text-${TailwindColorWithShade}`;
    },
    border: {
        color: `border-${TailwindColorWithShade}`;
        radius: TailwindBorderRadius;
    },
    button: {
        primary: `bg-${TailwindColorWithShade}`,
        secondary: `bg-${TailwindColorWithShade}`,
        primaryHover: `bg-${TailwindColorWithShade}`,
    }
    backgroundBlur: TailwindBlur
}

export const theme: HeritageTheme = {
    colors: {
        primary: 'blue-700',
        secondary: 'gray',
        background: 'black',
    },
    typography: {
        primary: 'text-gray-200',
        secondary: 'text-gray-400',
        hover: 'text-white',
    },
    button: {
        primary: 'bg-blue-700',
        secondary: 'bg-black-700',
        primaryHover: 'bg-blue-800',
    },
    border: {
        radius: 'rounded-lg',
        color: 'border-neutral-600',
    },
    backgroundBlur: 'backdrop-filter backdrop-blur-md bg-opacity-60'
}
