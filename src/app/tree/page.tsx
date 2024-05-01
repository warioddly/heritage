import {TreeInteractiveViewer} from "@/components/tree/InteractiveViewer";
// import {InformationDrawer} from "@/components/tree/InformationDrawer";

export default function Tree(){

    return (
        <main className="flex flex-col items-center justify-between">
           <>
               <TreeInteractiveViewer />
               {/*<InformationDrawer />*/}
           </>
        </main>
    )
}
