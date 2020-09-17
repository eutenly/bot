export default function parseTweetText(tweet: any): string {

    // Get text
    let text: string = tweet.full_text;

    // Replace t.co links
    tweet.entities.urls.forEach((u: any) => {

        // Get the actual link
        let replaceText: string = u.expanded_url;

        // Remove media links
        if (u.expanded_url === `https://twitter.com/i/web/status/${tweet.id_str}`) replaceText = "";

        // Remove links for quoted tweets
        if ((tweet.quoted_status) && (u.expanded_url === `https://twitter.com/${tweet.quoted_status.user.screen_name}/status/${tweet.quoted_status.id_str}`)) replaceText = "";

        // Replace link
        text = text.replace(new RegExp(u.url, "g"), replaceText);
    });

    // Return
    return text;
}