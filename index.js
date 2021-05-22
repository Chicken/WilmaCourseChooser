const fs = require("fs");
const fetch = require("node-fetch");
const ow = require("./openwilma.js/dist/index.js");
const courses = fs.readFileSync("courses.txt", "utf-8").trim().split("\n");
const [ username, password, server ] = fs.readFileSync("creds.txt", "utf-8").trim().split("\n");

// Function to choose the courses
async function choose(id, url, token, formkey) {
    let res = await fetch(`${url}/selection/postback`, {
        "headers": {
            // Fake headers to seem legit (probably not necessary)
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0",
            "Accept": "*/*",
            "Accept-Language": "fi-FI,fi;q=0.8,en-US;q=0.5,en;q=0.3",
            "Method": `POST ${url.split(".fi")[1]}/selection/postback HTTP/1.1`,
            "Content-Type": "application/x-www-form-urlencoded",
            "Sec-GPC": "1",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
            "Cookie": `enableAnalytics=true; Wilma2SID=${token}`
        },
        "referrer": `${url}/selection/view`,
        "body": `message=pick-group&target=${id}&formkey=${formkey}`,
        "method": "POST",
        "mode": "cors"
    });
    return await res.text();
}

(async () => {
    // Create an openwilma client and login
    let ses = new ow.client();
    let creds = await ses.login({
        username,
        password,
        server
    }, false);

    console.log(`Choosing ${courses.length} courses...`);
    // Loop courses and try to choose them
    for(let course of courses) {
        try {
            console.log(`Choosing "${course}"...`);
            // Print out results (look for wilma errors)
            console.log(await choose(course, creds.session.server, creds.session.id, creds.session.formkey));
        } catch {
            // Print out errors (look for http errors)
            console.error(`Error choosing "${course}"`);
            console.error(e);
        }
    }

    console.log("Finished choosing courses!");
})();
