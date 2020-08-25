export default class Data {

    // ID
    _id: string;

    // Users blacklisted for spam
    blacklistedUsers: [{
        id: string,
        reason: string
    }];

    // Servers blacklisted for spam
    blacklistedServers: [{
        id: string,
        reason: string
    }];

    // Exceptions for bot farm detection
    botFarmWhitelist: [string];
};