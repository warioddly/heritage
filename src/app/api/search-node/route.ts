import {NextResponse} from "next/server";
import {getApiData} from "@/core/utils/api-utils";
import {TreeNodeDefinition} from "@/core/types/tree-definition";

export async function POST(request: Request) {

    const body = await request.json();

    if (body.value) {

        const data = getApiData();

        if (!data) {
            return NextResponse.json({ message:  "Something went wrong!" });
        }

        let nodes: TreeNodeDefinition[] = JSON.parse(data);

        nodes = nodes.filter((item: any) => (item.data.name || "").toLowerCase().includes(body.value.toLowerCase()));

        return NextResponse.json(nodes);
    }
    else {
        return NextResponse.json({
            message: "Please provide a value"
        });
    }

}