import AnimatedVideoBackground from "@/components/other/AnimatedVideoBackground";
import {Baffler} from "@/components/other/Baffler";

export default function About() {
  return (
      <main className="relative flex min-h-screen flex-col items-center justify-between px-4 overflow-hidden">

        <div>
          <AnimatedVideoBackground src={'/videos/kyrgyz-paralax-horse.mp4'}/>
          <div className="relative h-screen flex flex-col items-center justify-center mx-auto w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-center" onMouseEnter={Baffler}>HERITAGE BY WARIODDLY</h1>
            <p className="text-lg text-center mt-4">This is a Heritage project for shows the family tree of the
              Kyrgyz people.</p>
          </div>
        </div>

        <div>
          <AnimatedVideoBackground src={'/videos/muras-horse.mp4'}/>
          <div className="relative h-screen flex flex-col items-center justify-center mx-auto w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-center" onMouseEnter={Baffler}>Idea</h1>
            <p className="text-lg text-center mt-4">So, in our country Kyrgyzstan, ancestors are highly valued,
              and
              it
              is said that everyone should know their line, that is, they should know their seven fathers, and
              I
              decided to make such a site with a convenient visual display in the form of a tree.</p>
          </div>
        </div>

        <div>
          <AnimatedVideoBackground src={'/videos/kyrgyz-tree.mp4'}/>
          <div className="relative h-screen flex flex-col items-center justify-center mx-auto w-full">

            <h1 className="text-4xl font-bold" onMouseEnter={Baffler}>How to contribute</h1>
            <p className="text-lg mt-4">This project is open source and you can contribute to it by:</p>

            <ul className="text-lg mt-4">
              <li>- Add yourself and your fathers</li>
              <li>- Report any wrong paths in the family tree</li>
              <li>- Creating a new issue</li>
              <li>- Fixing a bug</li>
              <li>- To give ideas for improving the site</li>
              <li>- Adding a new feature</li>
              <li>- Add yourself to</li>
              <li>- Etc.</li>
            </ul>

          </div>
        </div>

        {/*<div>*/}
        {/*    <AnimatedVideoBackground src={'/videos/kyrgyz-warriors.mp4'}/>*/}
        {/*    <div className="relative h-screen flex flex-col items-center justify-center mx-auto w-full">*/}

        {/*        <h1 className="text-4xl font-bold" onMouseEnter={Baffler}>Who Am I</h1>*/}
        {/*        <p className="text-lg mt-4">I am a Software Engineer from Kyrgyzstan</p>*/}

        {/*        <ul className="text-lg mt-4">*/}
        {/*            <li>- <a href="https://warioddly.vercel.app" target="_blank">Personal Website</a></li>*/}
        {/*            <li>- <a href="https://linkedin.com/in/warioddly" target="_blank">LinkedIn</a></li>*/}
        {/*            <li>- <a href="https://github.com/warioddly" target="_blank">GitHub</a></li>*/}
        {/*            <li>- <a href="mailto:warioddly@gmail.com">Email</a></li>*/}
        {/*        </ul>*/}

        {/*    </div>*/}
        {/*</div>*/}

        <div>
          <AnimatedVideoBackground src={'/videos/kyrgyz-eje.mp4'}/>
          <div className="relative h-screen flex flex-col items-center justify-center mx-auto w-full">

            <h1 className="text-4xl font-bold" onMouseEnter={Baffler}>Who Am I</h1>
            <p className="text-lg mt-4">I am a Software Engineer from Kyrgyzstan</p>

            <ul className="mt-4 text-start flex gap-2">
              <li><a href="https://warioddly.vercel.app" target="_blank" className="hover:text-blue-600">Website</a></li>
              <li><a href="https://linkedin.com/in/warioddly" target="_blank" className="hover:text-blue-600">LinkedIn</a></li>
              <li><a href="https://github.com/warioddly" target="_blank" className="hover:text-blue-600">GitHub</a></li>
              <li><a href="mailto:warioddly@gmail.com" className="hover:text-blue-600">Email</a></li>
            </ul>

          </div>
        </div>

      </main>
  );
}
