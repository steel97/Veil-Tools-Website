import type { IncomingMessage, ServerResponse } from "http";
import NodeCache from "node-cache";
import { BlockchainInfo } from "~/models/BlockchainInfo";

export const primaryCache = new NodeCache({ stdTTL: 60, checkperiod: 30 });

// chain info (explorer)
const getChainInfo = async () => {

    const cacheKey = "chaininfo";

    if (!primaryCache.has(cacheKey)) {
        const data = (await $fetch("https://explorer-api.veil-project.com/api/getblockchaininfo")) as any;
        try {
            const ret: BlockchainInfo = {
                status: true,
                timestamp: Math.round(new Date().getTime() / 1000),
                height: data.blocks as number,
                sizeOnDisk: data.size_on_disk as number
            };
            primaryCache.set<BlockchainInfo>(cacheKey, ret);
        } catch (e) {
            const ret: BlockchainInfo = {
                status: false,
                timestamp: Math.round(new Date().getTime() / 1000),
                height: 0,
                sizeOnDisk: 0
            };
            return ret;
        }
    }

    return primaryCache.get<BlockchainInfo>(cacheKey);

}

export default async (req: IncomingMessage, res: ServerResponse) => {

    const result = await getChainInfo();

    res.statusCode = 200;
    res.setHeader("content-type", "application/json");

    res.end(JSON.stringify(result));
}