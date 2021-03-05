import osUtils from "os-utils";
import collectStat from "../../util/collectStat";
import Client from "./Client";

export default function resourceUsage(client: Client) {

    // Set stats interval
    setInterval(() => {

        // CPU usage
        osUtils.cpuUsage((cpuUsage: number) => {

            // Memory usage
            const memoryUsage: number = Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100;

            // Collect stat
            collectStat(client, {
                type: "resourceUsageStat",
                cpu: cpuUsage,
                memory: memoryUsage
            });
        });
    }, 60000);
}