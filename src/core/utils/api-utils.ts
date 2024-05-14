import fs from "fs";
import {APP_API_DATA_FILE} from "@/core/data/constants";


export function getApiData(filename = APP_API_DATA_FILE) {

    const path = `${process.cwd()}/src/assets/data/${filename}`;

    if (!fs.existsSync(path)) {
        return undefined;
    }

    return fs.readFileSync(path, 'utf8');
}