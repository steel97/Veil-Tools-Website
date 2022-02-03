import type { IncomingMessage, ServerResponse } from "http";
import NodeCache from "node-cache";
import { PriceInfo } from "~/models/PriceInfo";

export const primaryCache = new NodeCache({ stdTTL: 60, checkperiod: 30 });

// price data (coingecko)
const getPrice = async () => {

    const cacheKey = "price";

    if (!primaryCache.has(cacheKey)) {
        const data = (await $fetch("https://api.coingecko.com/api/v3/simple/price?ids=veil&vs_currencies=usd")) as any;
        try {
            const veilPrice = data.veil.usd as number;
            primaryCache.set<PriceInfo>(cacheKey, {
                status: true,
                timestamp: Math.round(new Date().getTime() / 1000),
                price: veilPrice
            });
        } catch (e) {
            const res: PriceInfo = {
                status: false,
                timestamp: Math.round(new Date().getTime() / 1000),
                price: 0
            }
            return 0;
        }
    }

    return primaryCache.get<PriceInfo>(cacheKey);

}

export default async (req: IncomingMessage, res: ServerResponse) => {

    const result = await getPrice();

    res.statusCode = 200;
    res.setHeader("content-type", "application/json");

    res.end(JSON.stringify(result));
}