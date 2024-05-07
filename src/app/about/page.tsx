import Image from "next/image";
import {Baffler} from "@/components/other/Baffler";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="relative h-screen flex flex-col items-center justify-center">

            <Image src="/images/logo/logo.jpg" alt="Heritage Logo" width={950} height={950} />
            <div className="absolute inset-0 bg-black bg-opacity-85"></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center text-center">
                <h1 className="text-7xl md:text-9xl font-bold uppercase" onMouseEnter={Baffler}>Heritage</h1>
                <p className="text-normal text-gray-400 mx-auto w-96">A family tree application that helps you to keep track of your family history</p>
                <div className="flex mt-9 justify-center gap-2">
                    <a
                        href="/tree"
                        className="bg-blue-700 text-neutral-200 py-2 px-4 rounded border border-neutral-600 hover:bg-blue-800">
                        Get Started
                    </a>

                    <a
                        href="/about"
                        className="hover:bg-blue-800 text-neutral-200 font-bold py-2 px-4 rounded border border-neutral-600 backdrop-filter backdrop-blur-sm bg-black bg-opacity-30">
                        Learn More
                    </a>
                </div>
            </div>
        </div>
    </main>
  );
}
