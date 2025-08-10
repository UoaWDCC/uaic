import configPromise from "@payload-config";
import { getPayload as getPayloadInstance } from "payload";

export async function getPayload() {
    return getPayloadInstance({ config: await configPromise });
}