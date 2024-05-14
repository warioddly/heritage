import {NextResponse} from "next/server";
import {getApiData} from "@/core/utils/api-utils";


export async function GET() {

    const data = getApiData('graph.json');

    if (data) {
        return NextResponse.json(JSON.parse(data));
    }

    return NextResponse.json({ message:  "Something went wrong!" });
}