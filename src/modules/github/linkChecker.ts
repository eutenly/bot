import Message from "../../classes/Message/Message";
import UserRequest from "../../classes/UserRequest/UserRequest";
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

    // Regexes
    const HOSTNAME_REGEX: RegExp = /^(www\.)?github\.com$/;
    const GIST_HOSTNAME_REGEX: RegExp = /^(www\.)?gist\.github\.com$/;

    // Check if input is a gist link
    const gist = url.pathname.match(/\/(.+)\/(.+)/);
    if ((gist) && (GIST_HOSTNAME_REGEX.test(url.hostname))) return (userRequest: UserRequest) => githubGist(userRequest, gist[1], parseInt(gist[2]));

    // Check if input is a gist user link
    const gistUser = url.pathname.match(/\/(.+)/);
    if ((gistUser) && (GIST_HOSTNAME_REGEX.test(url.hostname))) return (userRequest: UserRequest) => githubGists(userRequest, gistUser[1]);

    if (HOSTNAME_REGEX.test(url.hostname)) {

        // Check if input is a search link
        if ((url.pathname === "/search") && (url.searchParams.get("q"))) return (userRequest: UserRequest) => githubSearch(userRequest, url.searchParams.get("q") as string);

        // Check if input is a file link
        const file = url.pathname.match(/\/(.+)\/(.+)\/blob\/master\/(.+)/);
        if (file) return (userRequest: UserRequest) => githubFile(userRequest, file[1], file[2], file[3]);

        // Check if input is a files link
        const files = url.pathname.match(/\/(.+)\/(.+)\/tree\/master\/(.+)/);
        if (files) return (userRequest: UserRequest) => githubFiles(userRequest, files[1], files[2], files[3]);

        // Check if input is an issue link
        const issue = url.pathname.match(/\/(.+)\/(.+)\/issues\/(.+)/);
        if (issue) return (userRequest: UserRequest) => githubIssue(userRequest, issue[1], issue[2], parseInt(issue[3]));

        // Check if input is an issues link
        const issues = url.pathname.match(/\/(.+)\/(.+)\/issues/);
        if (issues) return (userRequest: UserRequest) => githubIssues(userRequest, issues[1], issues[2]);

        // Check if input is a pr link
        const pr = url.pathname.match(/\/(.+)\/(.+)\/pulls\/(.+)/);
        if (pr) return (userRequest: UserRequest) => githubPR(userRequest, pr[1], pr[2], parseInt(pr[3]));

        // Check if input is a prs link
        const prs = url.pathname.match(/\/(.+)\/(.+)\/pulls/);
        if (prs) return (userRequest: UserRequest) => githubPRs(userRequest, prs[1], prs[2]);

        // Check if input is a releases link
        const releases = url.pathname.match(/\/(.+)\/(.+)\/releases/);
        if (releases) return (userRequest: UserRequest) => githubReleases(userRequest, releases[1], releases[2]);

        // Check if input is a repo link
        const repo = url.pathname.match(/\/(.+)\/(.+)/);
        if (repo) return (userRequest: UserRequest) => githubRepo(userRequest, repo[1], repo[2]);

        // Check if input is a repos link
        const repos = url.pathname.match(/\/(.+)/);
        if ((repos) && (url.searchParams.get("tab") === "repositories")) return (userRequest: UserRequest) => githubRepos(userRequest, repos[1]);

        // Check if input is a user link
        const user = url.pathname.match(/\/(.+)/);
        if (user) return (userRequest: UserRequest) => githubUser(userRequest, user[1]);

        // Check if input is home
        if (url.pathname === "/") return (userRequest: UserRequest) => githubHome(userRequest);
    }

    if (!linksOnly) {

        // Check if input is a user @
        const username = input.match(/@(.+)/);
        if (username) return (userRequest: UserRequest) => githubUser(userRequest, username[1]);

        // Check if input is an owner/repo
        const ownerRepo = input.match(/(.+)\/(.+)/);
        if (ownerRepo) return (userRequest: UserRequest) => githubRepo(userRequest, ownerRepo[1], ownerRepo[2]);

        // Check if input is to search last message
        if (input === "^") return (userRequest: UserRequest) => searchLastMessage(userRequest);
    }
}