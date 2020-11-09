import Message from "../../classes/Message/Message";
import githubFile from "../github/file/main";
import githubFiles from "../github/files/main";
import githubGist from "../github/gist/main";
import githubGists from "../github/gists/main";
import githubHome from "../github/home/main";
import githubIssue from "../github/issue/main";
import githubIssues from "../github/issues/main";
import githubPR from "../github/pr/main";
import githubPRs from "../github/prs/main";
import githubReleases from "../github/releases/main";
import githubRepo from "../github/repo/main";
import githubRepos from "../github/repos/main";
import githubSearch from "../github/search/main";
import searchLastMessage from "../github/searchLastMessage";
import githubUser from "../github/user/main";
import { LinkCheckerModule } from "../website/website/main";

export default function github(input: string, linksOnly?: boolean): LinkCheckerModule | undefined {

    // Check if input is a gist link
    const gist = input.match(/gist\.github\.com\/(.+)\/(.+)/);
    if (gist) return (message: Message) => githubGist(message, gist[1], parseInt(gist[2]));

    // Check if input is a gist user link
    const gistUser = input.match(/gist\.github\.com\/(.+)/);
    if (gistUser) return (message: Message) => githubGists(message, gistUser[1]);

    // Check if input is a search link
    const search = input.match(/github\.com\/search\?q=(.+)/);
    if (search) return (message: Message) => githubSearch(message, search[1]);

    // Check if input is a file link
    const file = input.match(/github\.com\/(.+)\/(.+)\/blob\/master\/(.+)/);
    if (file) return (message: Message) => githubFile(message, file[1], file[2], file[3]);

    // Check if input is a files link
    const files = input.match(/github\.com\/(.+)\/(.+)\/tree\/master\/(.+)/);
    if (files) return (message: Message) => githubFiles(message, files[1], files[2], files[3]);

    // Check if input is an issue link
    const issue = input.match(/github\.com\/(.+)\/(.+)\/issues\/(.+)/);
    if (issue) return (message: Message) => githubIssue(message, issue[1], issue[2], parseInt(issue[3]));

    // Check if input is an issues link
    const issues = input.match(/github\.com\/(.+)\/(.+)\/issues/);
    if (issues) return (message: Message) => githubIssues(message, issues[1], issues[2]);

    // Check if input is a pr link
    const pr = input.match(/github\.com\/(.+)\/(.+)\/pulls\/(.+)/);
    if (pr) return (message: Message) => githubPR(message, pr[1], pr[2], parseInt(pr[3]));

    // Check if input is a prs link
    const prs = input.match(/github\.com\/(.+)\/(.+)\/pulls/);
    if (prs) return (message: Message) => githubPRs(message, prs[1], prs[2]);

    // Check if input is a releases link
    const releases = input.match(/github\.com\/(.+)\/(.+)\/releases/);
    if (releases) return (message: Message) => githubReleases(message, releases[1], releases[2]);

    // Check if input is a repo link
    const repo = input.match(/github\.com\/(.+)\/(.+)/);
    if (repo) return (message: Message) => githubRepo(message, repo[1], repo[2]);

    // Check if input is a repos link
    const repos = input.match(/github\.com\/(.+)\?tab=repositories/);
    if (repos) return (message: Message) => githubRepos(message, repos[1]);

    // Check if input is a user link
    const user = input.match(/github\.com\/(.+)/);
    if (user) return (message: Message) => githubUser(message, user[1]);

    // Check if input is home
    if (/github\.com/.test(input)) return (message: Message) => githubHome(message);

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