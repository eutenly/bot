import cheerio from "cheerio";

export default function questions(result: any): any {

    // Return
    return {

        // Set type
        type: "questions",

        // Map each element with the `related-question-pair` class
        questions: result.find(".related-question-pair").map((_index: any, item: any) => {

            // Get item
            item = cheerio(item);

            // Return the text from the `cbphWd` class (item text)
            return item.find(".cbphWd").first().text();
        }).get().slice(0, 3)
    };
}