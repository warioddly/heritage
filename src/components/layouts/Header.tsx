"use client";
import { usePathname } from 'next/navigation';
import Image from "next/image";

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
                <h1 className="text-xl font-signature">
                    <a
                        className="link-underline link-underline-black flex items-center"
                        href="/"
                        rel="noreferrer"
                    >
                        <Image src="/images/logo/logo-rounded.jpg" alt="logo" width={35} height={35} />
                        <span className="ml-2 hidden md:block">Heritage</span>
                    </a>
                </h1>
            </div>

            <ul className="flex">
                {links.map(( link, index) => (
                    <li className="flex text-sm md:text-base" key={`item-${link.id}`}>
                        <div
                            key={link.id}
                            className={`nav-links px-2 cursor-pointer capitalize font-normal link-underline ${
                                pathname === link.link ? "text-blue-700" : "text-gray-400 hover:text-white transition-colors duration-300"
                            }`}
                        >
                            <a href={link.link}>{link.label}</a>
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