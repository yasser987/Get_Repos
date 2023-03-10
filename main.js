let input = document.querySelector(".search input");
let button = document.querySelector(".search button");
let repos = document.querySelector(".repos");

button.addEventListener("click", function (e) {
  if (input.value !== "") {
    // Prevent Auto Formatting of Form
    e.preventDefault();
    // Define The User Name Of Github
    repoUserName = input.value;
    let apiLink = `https://api.github.com/users/${repoUserName}/repos`;

    // Trigger Fetch Function
    getData(apiLink).then((result) => {
      prinInDoc(result);
    });
  }
});

function prinInDoc(result) {
  repos.innerHTML = "";
  console.log(result[0]);
  for (let i = 0; i < result.length; i++) {
    // Create Repo Container
    let repo = document.createElement("div");
    repo.classList.add("repo");

    // Create Text Section
    let text = document.createElement("div");
    text.classList.add("text");
    let repoName = document.createTextNode(result[i].name);
    text.appendChild(repoName);

    // Create Action Section
    let actions = document.createElement("div");
    actions.classList.add("actions");
    let visitButton = document.createElement("button");
    visitButton.classList.add("visit");
    let visitText = document.createTextNode("Visit");
    visitButton.appendChild(visitText);
    actions.appendChild(visitButton);

    visitButton.addEventListener("click", () => {
      window.open(result[i].svn_url, "_blank");
    });
    // Append Text And Actions To The Repos Container
    repo.appendChild(text);
    repo.appendChild(actions);
    repos.appendChild(repo);
  }
}

const getData = (apiLink) => {
  return new Promise((resolved, rejected) => {
    let myRequest = new XMLHttpRequest();
    myRequest.onload = function () {
      if (this.readyState === 4 && this.status === 200) {
        resolved(JSON.parse(this.responseText));
      } else {
        rejected("There Is No Repos At The Link You Provided");
      }
    };
    myRequest.open("GET", apiLink);
    myRequest.send();
  });
};
