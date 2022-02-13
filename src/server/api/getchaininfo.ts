import type { IncomingMessage, ServerResponse } from "http";
import NodeCache from "node-cache";
import { BlockchainInfo } from "~/models/BlockchainInfo";

export const primaryCache = new NodeCache();
const cacheInvalidateTime = 60;

// chain info (explorer)
const getChainInfo = async () => {
    const cacheKey = "chaininfo";
    const cacheTimeKey = "chaininfo_time";

    const cTime = Math.round(new Date().getTime() / 1000);
    if (!primaryCache.has(cacheKey) || primaryCache.get<number>(cacheTimeKey)! + cacheInvalidateTime < cTime) {
        primaryCache.set<number>(cacheTimeKey, cTime);
        // don't await, background
        $fetch<any>((process.env.EXPLORER_BACKEND_ENDPOINT! as string) + "/api/getblockchaininfo").then(data => {
            try {
                primaryCache.set<BlockchainInfo>(cacheKey, {
                    status: true,
                    timestamp: cTime,
                    height: data.blocks as number,
                    sizeOnDisk: data.size_on_disk as number
                });
            } catch (e) {

            }
        });
    }

    if (primaryCache.has(cacheKey))
        return primaryCache.get<BlockchainInfo>(cacheKey);
    else {
        const ret: BlockchainInfo = {
            status: false,
            timestamp: Math.round(new Date().getTime() / 1000),
            height: 0,
            sizeOnDisk: 0
        };
        return ret;
    }
}

export default async (req: IncomingMessage, res: ServerResponse) => {

    const result = await getChainInfo();

    res.statusCode = 200;
    res.setHeader("content-type", "application/json");

    res.end(JSON.stringify(result));
}