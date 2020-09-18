import cheerio from "cheerio";

export default function lyrics(section: any): any {

    // Map each element with the `ujudUb` class
    return section.find(".ujudUb").map((_index: any, lyrics: any) => {

        // Get lyrics
        lyrics = cheerio(lyrics);

        // Map each `span` element
        return {

            lyrics: lyrics.find("span").map((_index: any, lyric: any) => {

                // Get lyric
                lyric = cheerio(lyric);

                // Get the text
                const text: any = lyric.text();

                // Ignore `…` text
                if (text.trim() === "…") return;

                // Return
                return text;
            }).get().filter((l: any) => l)
        };
    }).get().map((l: any) => l.lyrics);
}