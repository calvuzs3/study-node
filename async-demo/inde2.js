console.log("Before");
getUser( 1, getUserRepositories );
console.log("After");0

// function getUser( id ) { getUser(id, getUserRepos);}
function getUserRepositories(user) { getUserRepos(user.gitHubUsername, getUserRepositoriesCommits);}
function getUserRepositoriesCommits(repo) { getCommits(repo, displayCommits)}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Fetching data of the User....");
    callback({ id: id, gitHubUsername: "luke" });
  }, 2000);
}
function getUserRepos(username, callback) {
  repos = [
    { id: 1, name: "repo1" },
    { id: 2, name: "repo2" },
    { id: 3, name: "repo3" },
  ];

  if (username === "luke")
    setTimeout(() => {
      console.log("Fetching Repos for User....");
      displayRepos(repos);
      callback(repos);
    }, 2000);
}
function getCommits(repos) {
    repos.forEach(repo => {
        displayCommits(repo);   
    });   
}
function displayUser(user) {
    console.log('User', user);
}
function displayCommits(commits) {
  console.log("Commits", commits);
}
function displayRepos( repos) {
    console.log('Repos', repos);
}
