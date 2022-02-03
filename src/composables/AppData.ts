import NodeCache from "node-cache";
import { BlockchainInfo } from "@/models/BlockchainInfo";

export const primaryCache = new NodeCache({ stdTTL: 60, checkperiod: 30 });

export const useAppData = () => {
    // price data (coingecko)
    const getPrice = async () => {

        const cacheKey = "price";

        if (!primaryCache.has(cacheKey)) {
            const data = await $fetch<any>("https://api.coingecko.com/api/v3/simple/price?ids=veil&vs_currencies=usd");
            try {
                const veilPrice = data.veil.usd as number;
                primaryCache.set<number>(cacheKey, veilPrice);
            } catch (e) {
                return 0;
            }
        }

        return primaryCache.get<number>(cacheKey);

    }

    // chain info (explorer)
    const getChainInfo = async () => {

        const cacheKey = "chaininfo";

        if (!primaryCache.has(cacheKey)) {
            const data = await $fetch<any>("https://explorer-api.veil-project.com/api/getblockchaininfo");
            try {
                const ret: BlockchainInfo = {
                    height: data.blocks as number,
                    sizeOnDisk: data.size_on_disk as number
                };
                primaryCache.set<BlockchainInfo>(cacheKey, ret);
            } catch (e) {
                const ret: BlockchainInfo = {
                    height: 0,
                    sizeOnDisk: 0
                };
                return ret;
            }
        }

        return primaryCache.get<BlockchainInfo>(cacheKey);

    }

    // snapshots (local configs)

    return { getPrice, getChainInfo };
}