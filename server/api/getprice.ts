import type { PriceInfo } from "~/models/PriceInfo";
import { setResponseHeader } from "h3";

const cacheInvalidateTime = 60;
const cacheInvalidateTimeRetry = cacheInvalidateTime - 2;

// price data (coingecko)
export default defineEventHandler(async (event) => {
  setResponseStatus(event, 200);
  setResponseHeader(event, "content-type", "application/json");

  const { value, addToCache } = await useDataCache<PriceInfo>("price", event);
  const cache = await useDataCache<boolean>("priceCache", event);

  if (!cache.value) {
    cache.addToCache(true, undefined, cacheInvalidateTimeRetry);
    setTimeout(async () => {
      try {
        const data = await $fetch<any>("https://api.coingecko.com/api/v3/simple/price?ids=veil&vs_currencies=usd");
        const veilPrice = data.veil.usd as number;
        const cacheData = {
          status: true,
          timestamp: Math.round(new Date().getTime() / 1000),
          price: veilPrice,
        };
        await addToCache(cacheData, undefined);
      }
      catch (e) {
      }
    }, 1);
  }

  if (value) {
    return value;
  }

  const res: PriceInfo = {
    status: false,
    timestamp: Math.round(new Date().getTime() / 1000),
    price: 0,
  };

  return res;
});