import type { Mirror, Network, Networks, Snapshot } from "~/models/Networks";
import { useDataCache } from "#nuxt-multi-cache/composables";
import { setResponseHeader } from "h3";

const cacheInvalidateTime = 60;

// mirrors, probably can remove async, leave for now for feature things
export default defineEventHandler(async (event) => {
  setResponseStatus(event, 200);
  setResponseHeader(event, "content-type", "application/json");

  const runtimeConfig = useRuntimeConfig();

  const { value, addToCache } = await useDataCache<Networks>("mirrors", event);
  if (value) {
    return value;
  }

  const cTime = Math.round(new Date().getTime() / 1000);
  let ret: Networks = {
    timestamp: cTime,
    networks: {},
  };

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

  ret = result;

  addToCache(ret, undefined, cacheInvalidateTime);
  return ret;
});