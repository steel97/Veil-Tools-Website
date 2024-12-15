import type { PriceInfo } from "~/models/PriceInfo";
import { useDataCache } from "#nuxt-multi-cache/composables";
import { setResponseHeader } from "h3";

const cacheInvalidateTime = 60;

// price data (coingecko)
export default defineEventHandler(async (event) => {
  setResponseStatus(event, 200);
  setResponseHeader(event, "content-type", "application/json");

  const { value, addToCache } = await useDataCache<PriceInfo>("price", event);

  if (value) {
    return value;
  }

  let res: PriceInfo = {
    status: false,
    timestamp: Math.round(new Date().getTime() / 1000),
    price: 0,
  };

  try {
    const data = await $fetch<any>("https://api.coingecko.com/api/v3/simple/price?ids=veil&vs_currencies=usd");
    const veilPrice = data.veil.usd as number;
    res = {
      status: true,
      timestamp: Math.round(new Date().getTime() / 1000),
      price: veilPrice,
    };
  }
  catch (e) {
  }

  await addToCache(res, undefined, cacheInvalidateTime);
  return res;
});