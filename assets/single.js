let issueContainerEl = document.querySelector("#issues-container");
let limitWarningEl = document.querySelector("#limit-warning");

let getRepoNames = function () {
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    if (repoName) {
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
    } else {
        document.location.replace("./index.html");
    }
    ;
}


let getReposIssues = function (repo) {
    var apiUrl = "https://api.github/repos/" + repo + "/issues?direction=asc";
    console.log(repo);
    fetch(apiUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                displayIssues(data);

                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        } else {
            // if not successful, redirect to homepage
            document.location.replace("./index.html");
        }
    });



    //function that accepts a parameter called issues
    let displayIssues = function (issues) {
        if (issues.length === 0) {
            issueContainerEl.textContent = "This repo has no open issues";
            return;
        }
        issueContainerEl.appendChild(issueEl);
        for (var i = 0; i < issues.length; i++) {
            //create a link element
            var issueEl = document.createElement("a");
            issueEl.classList = "list-item flex-row justify-space-between align-center;"
            issueEl.setAttribute("href", issues[i].html_url);
            issueEl.setAttribute("target", "_blank");
        }
        //create span to hold issue title
        var titleEl = document.createElement(".span");
        titleEl.textContent = issue[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request
        if (issues[i.pull_request]) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issues)";
        }
        issueEl.appendChild(typeEl);
    };

    let displayWarning = function (repo) {
        //add text to warning container
        limitWarningEl.textContent = "To see more than 30 issues visit "

        // create link element
        var linkEl = document.createElement("a");
        linkEl.textContent = "GitHub.com";
        linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
        linkEl.setAttribute("target", "_blank");

        // append to warning container
        limitWarningEl.appendChild(linkEl);
    };

    getReposIssues("facebook/react")