import {NextResponse} from "next/server";
import * as fs from "fs";

export async function GET(request: Request) {

    const data = fs.readFileSync(process.cwd() + '/src/assets/data/tree-data.json', 'utf8');

    if (data) {
        return NextResponse.json(JSON.parse(data));
    }

    return NextResponse.json({ message:  "Something went wrong!" });
}