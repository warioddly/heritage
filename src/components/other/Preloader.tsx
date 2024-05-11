

export default function Preloader(){

    return (
        <div className="z-40 fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center select-none">
            <div className="absolute inset-0 bg-black bg-opacity-90"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center text-center items-center">
                <div className="rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-500 animate-pulse"></div>
                <p className="text-normal text-gray-400 mx-auto w-96 mt-2">Please wait this may take a while...</p>
            </div>
        </div>
    )
}
