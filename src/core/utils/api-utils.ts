import fs from "fs";
import {APP_API_DATA_FILE} from "@/core/data/constants";


export function getApiData() {

    const file = `${process.cwd()}/src/assets/data/${APP_API_DATA_FILE}`;

    if (!fs.existsSync(file)) {
        return undefined;
    }

    return fs.readFileSync(`${process.cwd()}/src/assets/data/${APP_API_DATA_FILE}`, 'utf8');
}