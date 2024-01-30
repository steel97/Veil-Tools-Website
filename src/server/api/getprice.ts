import NodeCache from "node-cache";
import type { PriceInfo } from "~/models/PriceInfo";
import { setResponseHeader } from "h3";

export const primaryCache = new NodeCache();
const cacheInvalidateTime = 60;

// price data (coingecko)
const getPrice = async () => {
    const cacheKey = "price";
    const cacheTimeKey = "price_time";

    const cTime = Math.round(new Date().getTime() / 1000);
    if (!primaryCache.has(cacheTimeKey) || primaryCache.get<number>(cacheTimeKey)! + cacheInvalidateTime < cTime) {
        primaryCache.set<number>(cacheTimeKey, cTime);
        // don't await, background
        $fetch<any>("https://api.coingecko.com/api/v3/simple/price?ids=veil&vs_currencies=usd").then(data => {
            try {
                const veilPrice = data.veil.usd as number;
                primaryCache.set<PriceInfo>(cacheKey, {
                    status: true,
                    timestamp: cTime,
                    price: veilPrice
                });
            } catch (e) {

            }
        });
    }

    if (primaryCache.has(cacheKey))
        return primaryCache.get<PriceInfo>(cacheKey);
    else {
        const res: PriceInfo = {
            status: false,
            timestamp: Math.round(new Date().getTime() / 1000),
            price: 0
        }
        return res;
    }
}

export default defineEventHandler(async (event) => {

    const result = await getPrice();

    setResponseStatus(event, 200);
    setResponseHeader(event, "content-type", "application/json");

    return result;
});