console.log("Before");

const p = getUser(1);
p
.then(user => getUserRepos(user.gitHubUsername))
.then(repos => getCommits(repos))
.then(commits => displayCommits());

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching User....");
      resolve( {id: id, gitHubUsername: 'luke'} );
    }, 1000);
  });
}
function getUserRepos(username) {
  repos = [
    { id: 1, name: "repo1" },
    { id: 2, name: "repo2" },
    { id: 3, name: "repo3" },
  ];

//   if (username === 'luke')
    return new Promise((resolve, rejecct) => {
      setTimeout(() => {
        console.log("Fetching Repos for User....");
        resolve(repos);
      }, 1000);
    });
}

function getCommits(repos) {
  repos.forEach((repo) => {
      console.log('Fetching Commits for Repo number ' +  repo.id );
    displayCommits(repo);
  });
}
function displayUser(user) {
  console.log("User", user);
}
function displayCommits(commits) {
  console.log("Commits", ['Comit1', 'Comit2', 'Comit3'] );
}
function displayRepos(repos) {
  console.log("Repos", repos);
}
