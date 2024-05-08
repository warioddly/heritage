import {NextResponse} from "next/server";
import * as fs from "fs";

export async function GET(request: Request) {

    // read json and return
    // fs.readFile(process.cwd() + '/assets/data/tree-data.json');

    return NextResponse.json({ message: 'Hello from Next.jsdawd!' })
}