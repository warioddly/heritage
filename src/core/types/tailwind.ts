export type TailwindColor =
    | "orange"
    | "violet"
    | "red"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "blue"
    | "indigo"
    | "purple"
    | "pink"
    | "gray"
    | "black"
    | "white"
    | "neutral"
    | "rose";


export type TailwindColorShade =
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";


export type TailwindColorWithShade =
    | `${TailwindColor}-${TailwindColorShade}`
    | TailwindColor


export type TailwindBorderRadius =
    | "rounded-none"
    | "rounded-sm"
    | "rounded"
    | "rounded-md"
    | "rounded-lg"
    | "rounded-xl"
    | "rounded-2xl"
    | "rounded-3xl"
    | "rounded-full";


export type TailwindBlur =
    | 'backdrop-filter backdrop-blur-sm bg-opacity-20'
    | 'backdrop-filter backdrop-blur-md bg-opacity-20'
    | 'backdrop-filter backdrop-blur-md bg-opacity-30'
    | 'backdrop-filter backdrop-blur-md bg-opacity-40'
    | 'backdrop-filter backdrop-blur-md bg-opacity-50'
    | 'backdrop-filter backdrop-blur-md bg-opacity-60'
