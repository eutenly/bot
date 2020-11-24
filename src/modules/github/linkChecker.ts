import Message from "../../classes/Message/Message";
import { LinkCheckerModule } from "../website/website/main";
import githubFile from "./file/main";
import githubFiles from "./files/main";
import githubGist from "./gist/main";
import githubGists from "./gists/main";
import githubHome from "./home/main";
import githubIssue from "./issue/main";
import githubIssues from "./issues/main";
import githubPR from "./pr/main";
import githubPRs from "./prs/main";
import githubReleases from "./releases/main";
import githubRepo from "./repo/main";
import githubRepos from "./repos/main";
import githubSearch from "./search/main";
import searchLastMessage from "./searchLastMessage";
import githubUser from "./user/main";

export default function linkChecker(input: string, linksOnly?: boolean): LinkCheckerModule | undefined {

    // Create url
    let inputURL: string = input;
    if ((!inputURL.startsWith("http://")) && (!inputURL.startsWith("https://"))) inputURL = `http://${inputURL}`;
    let url: URL = new URL("https://this_variable_needs_to_be_defined");
    try { url = new URL(inputURL); } catch { }

    // Not a github link
    if ((url.hostname !== "github.com") && (url.hostname !== "gist.github.com")) return;

    // Check if input is a gist link
    const gist = url.pathname.match(/\/(.+)\/(.+)/);
    if ((gist) && (url.hostname === "gist.github.com")) return (message: Message) => githubGist(message, gist[1], parseInt(gist[2]));

    // Check if input is a gist user link
    const gistUser = url.pathname.match(/\/(.+)/);
    if ((gistUser) && (url.hostname === "gist.github.com")) return (message: Message) => githubGists(message, gistUser[1]);

    // Not a github.com link
    if (url.hostname !== "github.com") return;

    // Check if input is a search link
    if ((url.pathname === "/search") && (url.searchParams.get("q"))) return (message: Message) => githubSearch(message, url.searchParams.get("q") as string);

    // Check if input is a file link
    const file = url.pathname.match(/\/(.+)\/(.+)\/blob\/master\/(.+)/);
    if (file) return (message: Message) => githubFile(message, file[1], file[2], file[3]);

    // Check if input is a files link
    const files = url.pathname.match(/\/(.+)\/(.+)\/tree\/master\/(.+)/);
    if (files) return (message: Message) => githubFiles(message, files[1], files[2], files[3]);

    // Check if input is an issue link
    const issue = url.pathname.match(/\/(.+)\/(.+)\/issues\/(.+)/);
    if (issue) return (message: Message) => githubIssue(message, issue[1], issue[2], parseInt(issue[3]));

    // Check if input is an issues link
    const issues = url.pathname.match(/\/(.+)\/(.+)\/issues/);
    if (issues) return (message: Message) => githubIssues(message, issues[1], issues[2]);

    // Check if input is a pr link
    const pr = url.pathname.match(/\/(.+)\/(.+)\/pulls\/(.+)/);
    if (pr) return (message: Message) => githubPR(message, pr[1], pr[2], parseInt(pr[3]));

    // Check if input is a prs link
    const prs = url.pathname.match(/\/(.+)\/(.+)\/pulls/);
    if (prs) return (message: Message) => githubPRs(message, prs[1], prs[2]);

    // Check if input is a releases link
    const releases = url.pathname.match(/\/(.+)\/(.+)\/releases/);
    if (releases) return (message: Message) => githubReleases(message, releases[1], releases[2]);

    // Check if input is a repo link
    const repo = url.pathname.match(/\/(.+)\/(.+)/);
    if (repo) return (message: Message) => githubRepo(message, repo[1], repo[2]);

    // Check if input is a repos link
    const repos = url.pathname.match(/\/(.+)/);
    if ((repos) && (url.searchParams.get("tab") === "repositories")) return (message: Message) => githubRepos(message, repos[1]);

    // Check if input is a user link
    const user = url.pathname.match(/\/(.+)/);
    if (user) return (message: Message) => githubUser(message, user[1]);

    // Check if input is home
    if (url.pathname === "/") return (message: Message) => githubHome(message);

    if (!linksOnly) {

        // Check if input is a user @
        const username = input.match(/@(.+)/);
        if (username) return (message: Message) => githubUser(message, username[1]);

        // Check if input is an owner/repo
        const ownerRepo = input.match(/(.+)\/(.+)/);
        if (ownerRepo) return (message: Message) => githubRepo(message, ownerRepo[1], ownerRepo[2]);

        // Check if input is to search last message
        if (input === "^") return (message: Message) => searchLastMessage(message);
    }
}