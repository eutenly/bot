import osUtils from "os-utils";
import collectStat from "../../util/collectStat";
import Client from "./Client";

export default function resourceUsage(client: Client) {

    // Set stats interval
    setInterval(() => {

        // CPU usage
        osUtils.cpuUsage((cpuUsage: number) => collectStat(client, {
            measurement: "cpu_usage",
            fields: {
                value: cpuUsage
            }
        }));

        // Memory usage
        const memoryUsage: number = Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100;
        collectStat(client, {
            measurement: "memory_usage",
            fields: {
                value: memoryUsage
            }
        });
    }, 60000);
}