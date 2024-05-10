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
        border: TailwindColorWithShade;
    },
    typography: {
        primary: TailwindColorWithShade;
        secondary: TailwindColorWithShade;
        hover: TailwindColorWithShade;
    },
    border: {
        radius: TailwindBorderRadius;
    },
    button: {
        primary: TailwindColorWithShade,
        secondary: TailwindColorWithShade,
        primaryHover: TailwindColorWithShade,
    }
    backgroundBlur: TailwindBlur
}

export const theme: HeritageTheme = {
    colors: {
        primary: 'blue-700',
        secondary: 'gray',
        background: 'black',
        border: 'neutral-800',
    },
    typography: {
        primary: 'gray-300',
        secondary: 'gray-400',
        hover: 'white',
    },
    button: {
        primary: 'blue-700',
        secondary: 'black-700',
        primaryHover: 'blue-900',
    },
    border: {
        radius: 'rounded-lg',
    },
    backgroundBlur: 'backdrop-filter backdrop-blur-md bg-opacity-60'
}
