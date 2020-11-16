export default function randomTip(): string {

    // Define tips
    const tips = [
        "Have any questions about Eutenly? Join our support server and ask our Support Staff with `e;support`",
        "Want to add Eutenly to your server? Get an invite link with `e;invite`",
        "Manage your connections at https://eutenly.com/connections",
        "Save links and results for later with `e;save` and view them with `e;savedlinks`",
        "Search for the last message in the channel with commands like `e;search ^`, `e;youtube ^`, etc",
        "View your Twitter timeline with `e;twitter timeline`",
        "View your Reddit feed with `e;reddit feed`",
        "View your saved Reddit posts with `e;reddit saved`",
        "Control Spotify with Eutenly with commands like `e;spotify pause/resume/skip/previous`",
        "Share what you're listening to on Spotify with `e;spotify current`",
        "View your top Spotify tracks with `e;spotify top tracks` and your top artists with `e;spotify top artists`",
        "View your Spotify listening history with `e;spotify history`",
        "You can use the reactions below Tweets to like and retweet them",
        "You can use the reactions below Spotify tracks to play, queue, and save them",
        "You can use the reactions below Reddit posts to vote on them or save them",
        "You can use the star reaction below GitHub repos star them",
        "Compact mode lets you shrink embeds to take up less space",
        "Quickly view a Twitter/GitHub/etc user with `e;twitter/github/etc @user`",
        "Quickly view a subreddit or Reddit user with `e;reddit r/subreddit_name` or `e;reddit u/username`"
    ];

    // Return
    return tips[Math.floor(Math.random() * tips.length)];
}