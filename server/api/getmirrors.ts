import type { Mirror, Network, Networks, Snapshot } from "~/models/Networks";
import { setResponseHeader } from "h3";
import NodeCache from "node-cache";

export const primaryCache = new NodeCache();
const cacheInvalidateTime = 60;

// mirrors, probably can remove async, leave for now for feature things
const getMirrors = async () => {
  const runtimeConfig = useRuntimeConfig();

  const cacheKey = "mirrors";
  const cacheTimeKey = "mirrors_time";

  const cTime = Math.round(new Date().getTime() / 1000);
  if (!primaryCache.has(cacheKey) || primaryCache.get<number>(cacheTimeKey)! + cacheInvalidateTime < cTime) {
    primaryCache.set<number>(cacheTimeKey, cTime);

    setTimeout(async () => {
      const mirrors = runtimeConfig.public.snapshotMirrors as Array<Network>;
      const result: Networks = {
        timestamp: 0,
        networks: {},
      };

      for (const network of mirrors) {
        const networkName = network.name as string;
        const networkMirrors = network.mirrors as Array<any>;
        const networkIcon = network.icon as string;

        const resultMirrors: Array<Mirror> = [];

        for (const mirror of networkMirrors) {
          try {
            const mirrorName = mirror.name;
            const mirrorPath = mirror.path;

            // get available snapshots
            // excessive stack depth comparing types
            // @ts-ignore
            const snapshotInfo = (await $fetch(`${mirrorPath}snapshot.json`)) as any;

            // construct data of mirror
            const resultMirror: Mirror = {
              name: mirrorName,
              path: mirrorPath,
              snapshots: new Array<Snapshot>(),
            };

            const snapshotResult: Array<Snapshot> = [];

            for (const snapshot of snapshotInfo.snapshots) {
              try {
                const url = mirrorPath + snapshot.sha256;
                // excessive stack depth comparing types
                // @ts-ignore
                const response: string = await $fetch(url);
                const hash = response.split(" ")[0];
                snapshotResult.unshift({
                  name: snapshot.name as string,
                  sha256: hash ?? "",
                  block: snapshot.block as string,
                  date: snapshot.date as string,
                });
              }
              catch {
                // thrown if one of snapshots not found
              }
            }

            resultMirror.snapshots = snapshotResult;

            resultMirrors.push(resultMirror);
          }
          catch {

          }
        }

        result.timestamp = cTime;
        result.networks[networkName.toLowerCase()] = {
          icon: networkIcon,
          name: networkName,
          mirrors: resultMirrors,
        };
      }

      primaryCache.set<Networks>(cacheKey, result);
    }, 10);
  }

  if (primaryCache.has(cacheKey)) {
    return primaryCache.get<Networks>(cacheKey);
  }
  else {
    const ret: Networks = {
      timestamp: cTime,
      networks: {},
    };
    return ret;
  }
};

export default defineEventHandler(async (event) => {
  const data = await getMirrors();

  setResponseStatus(event, 200);
  setResponseHeader(event, "content-type", "application/json");

  return data;
});