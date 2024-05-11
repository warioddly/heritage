import Image from "next/image";
import {Baffler} from "@/components/other/Baffler";
import {theme} from "@/core/styles/theme";
import TextButton from "@/components/other/TextButton";

export default function Home() {
  return (
    <main>
        <div className="relative h-screen flex flex-col items-center justify-center">

            <Image src="/images/logo/logo.jpg" alt="Heritage Logo" width={950} height={950} />
            <div className="absolute inset-0 bg-black bg-opacity-85"></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center text-center">
                <h1 className="text-7xl md:text-9xl font-bold uppercase" onMouseEnter={Baffler}>Heritage</h1>
                <p className={`text-normal ${theme.typography.secondary} mx-auto w-96`}>A family tree application that helps you to keep track of your family history</p>
                <div className="flex mt-9 justify-center gap-2">
                    <TextButton
                        text="Get Started"
                        className={`bg-${theme.colors.primary} border-blue-700`}
                        href='/tree'
                    />
                    <TextButton
                        text="Learn More"
                        href='/about'
                    />
                </div>
            </div>

        </div>
    </main>
  );
}
