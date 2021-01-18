let issueContainerEl = document.querySelector("#issues-container");

let getReposIssues = function(repo){
    var apiUrl = "https://api.github/repos/"+repo+"/issues?direction=asc";
    console.log(repo);
    fetch(apiUrl).then(function(data){
        if(Response.ok){
            Response.jason().then(function(data){
                //pass response data to dom function
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request!")
        }
    });
};
//function that accepts a parameter called issues
let displayIssues = function(issues){
    if(issues.length === 0){
        issueContainerEl.textContent = "This repo has no open issues";
        return;
    }
    issueContainerEl.appendChild(issueEl);
    for (var i=0; i< issues.length; i++){
        //create a link element
        var issueEl = document.createElement("a");
        issueEl.classList="list-item flex-row justify-space-between align-center;"
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
    if(issues[i.pull_request]){
        typeEl.textContent="(Pull request)";
    } else {
        typeEl.textContent = "(Issues)";
    }
    issueEl.appendChild(typeEl);
};

getReposIssues("facebook/react")