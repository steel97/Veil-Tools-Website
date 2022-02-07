import type { IncomingMessage, ServerResponse } from "http";
import NodeCache from "node-cache";
import { PriceInfo } from "~/models/PriceInfo";

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

export default async (req: IncomingMessage, res: ServerResponse) => {

    const result = await getPrice();

    res.statusCode = 200;
    res.setHeader("content-type", "application/json");

    res.end(JSON.stringify(result));
}