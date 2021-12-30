console.log("Before");
getUser(1, (user) => {
  console.log("The user has been retrived.");
  console.log(user);
  getUserRepos(user.gitHubUsername, (repos) => {
      console.log(`The Repos of user ${user.gitHubUsername}, has been retrived: `);
      console.log( repos );
  });
});

console.log("After");

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
      console.log("Fetching data of Repos....");
      callback(repos);
    }, 2000);
}
