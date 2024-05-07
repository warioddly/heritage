"use client";
import { usePathname } from 'next/navigation';
import Image from "next/image";
import {Baffler} from "@/components/other/Baffler";

export function Header() {

    const pathname = usePathname();
    const links = [
        {
            id: 1,
            label: "Home",
            link: "/",
        },
        {
            id: 3,
            label: "Tree",
            link: "/tree",
        },
        {
            id: 2,
            label: "About",
            link: "/about",
        }
    ];

    return (
        <header className="
            flex justify-between items-center w-full h-16 px-4 text-white fixed nav
            border-neutral-800 border-b
            backdrop-filter backdrop-blur-md bg-black bg-opacity-30
            z-20
        ">

            <div>
                <h1 className="text-xl font-signature select-none">
                    <a
                        className="link-underline link-underline-black flex items-center"
                        href="/"
                        rel="noreferrer"
                    >
                        <Image src="/images/logo/logo-rounded.jpg" alt="logo" width={35} height={35} />
                        <span className="ml-2 hidden md:block uppercase" onMouseEnter={Baffler}>Heritage</span>
                    </a>
                </h1>
            </div>

            <ul className="flex select-none">
                {links.map(( link, index) => (
                    <li className="flex text-xs md:text-sm" key={`item-${link.id}`}>
                        <div
                            key={link.id}
                            className={`nav-links px-2 cursor-pointer uppercase font-normal link-underline ${
                                pathname === link.link ? "text-blue-700" : "text-gray-400 hover:text-white transition-colors duration-300"
                            }`}
                        >
                            <a href={link.link} onMouseEnter={Baffler}>{link.label}</a>
                        </div>
                        <div className="text-gray-600 cursor-pointer">
                            {links.length - 1 === index ? "" : "/"}
                        </div>
                    </li>
                ))}
            </ul>

        </header>
    );
}