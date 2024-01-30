import NodeCache from "node-cache";
import type { BlockchainInfo } from "~/models/BlockchainInfo";
import { setResponseHeader } from "h3";

export const primaryCache = new NodeCache();
const cacheInvalidateTime = 60;

// chain info (explorer)
const getChainInfo = async () => {
    const runtimeConfig = useRuntimeConfig();

    const cacheKey = "chaininfo";
    const cacheTimeKey = "chaininfo_time";

    const cTime = Math.round(new Date().getTime() / 1000);
    if (!primaryCache.has(cacheKey) || primaryCache.get<number>(cacheTimeKey)! + cacheInvalidateTime < cTime) {
        primaryCache.set<number>(cacheTimeKey, cTime);
        // don't await, background
        $fetch<any>(runtimeConfig.public.explorerBackendEndpoint + "/api/getblockchaininfo").then(data => {
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

export default defineEventHandler(async (event) => {
    const result = await getChainInfo();

    setResponseStatus(event, 200);
    setResponseHeader(event, "content-type", "application/json");

    return result;
});