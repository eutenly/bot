import vibrant from "node-vibrant";
import { Palette, Swatch } from "node-vibrant/lib/color";
import catchPromise from "./catchPromise";

export default async function getColor(input: string): Promise<string | null> {

    // No input
    if (!input) return null;

    // Get palette
    const palette: Palette = await catchPromise(vibrant.from(input).getPalette());
    if (!palette) return null;

    // Get color
    let color: Swatch | undefined =
        palette.Vibrant ||
        palette.LightVibrant ||
        palette.DarkVibrant ||
        palette.Muted ||
        palette.LightMuted ||
        palette.DarkMuted;
    if (!color) return null;

    // Get hex
    const hex: string = color.getHex();

    // Return
    return hex;
}