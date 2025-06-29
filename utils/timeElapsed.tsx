export default function getTimeElapsed(time: string) {
    const currentTime = new Date();
    const msElapsed = currentTime.getTime() - new Date(time).getTime();

    if (msElapsed < 60000) {
        return ("now");
    } else if (msElapsed < 3.6e6) {
        return(
            Math.floor(msElapsed / 60000).toString() + " minutes ago"
        );
    } else if (msElapsed < 8.64e7) {
        return(
            Math.floor(msElapsed / 3600000).toString() + " hours ago"
        );
    } else {
        return(
            Math.floor(msElapsed / 86400000).toString() + " days ago"
        );
    }
}