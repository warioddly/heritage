import {NextResponse} from "next/server";
import {TreeNodeDataDefinition} from "@/core/types/tree-definition";
import {getApiData} from "@/core/utils/api-utils";

export async function POST(request: Request) {

    const body  = await request.json();

    if (body.id) {

        const data = getApiData();

        if (!data) {
            return NextResponse.json({ message: "Something went wrong!" });
        }

        const parentId = body.id.toString();
        const nodes: TreeNodeDataDefinition[] = JSON.parse(data);

        const children = nodes.filter((item: any) => item.data.source === parentId);

        return NextResponse.json(children);
    }
    else {
        return NextResponse.json({
            message: "Please provide an ID"
        });
    }

}