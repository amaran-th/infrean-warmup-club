import { Octokit } from "https://esm.sh/@octokit/core";

const resultBox = document.querySelector(".result-box");
const profileImage = document.querySelector(".profile-image");
const viewProfileButton = document.querySelector(".view-profile-button");
const publicRepos = document.querySelector(".repos-label span");
const publicGists = document.querySelector(".gists-label span");
const followers = document.querySelector(".followers-label span");
const following = document.querySelector(".following-label span");
const company = document.querySelector(".company span");
const site = document.querySelector(".site a");
const location = document.querySelector(".location span");
const createdAt = document.querySelector(".created-at span");

const repoList = document.querySelector(".repos-list");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
const alarm = document.querySelector(".alarm");

const activateAlarm = (comment) => {
  alarm.setAttribute("style", "display: block");
  alarm.textContent = comment;
  setTimeout(() => {
    alarm.setAttribute("style", "display: none");
  }, 3000);
};

const username = document.querySelector(".search-input");

const setUserProfile = async (username) => {
  const response = await octokit.request("GET /users/{username}", {
    username: event.target.value,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  const { data } = response;

  resultBox.setAttribute("style", "display: block");
  profileImage.setAttribute("src", data.avatar_url);
  viewProfileButton.addEventListener("click", () => {
    document.location.href = "https://github.com/" + data.username;
  });
  publicRepos.textContent = data.public_repos;
  publicGists.textContent = data.public_gists;
  followers.textContent = data.followers;
  following.textContent = data.following;
  company.textContent = data.company;
  site.setAttribute("href", data.blog);
  site.textContent = data.blog;
  location.textContent = data.location;
  createdAt.textContent = data.created_at;
};

const setUserRepos = async (username) => {
  const response = await octokit.request(
    "GET /users/{username}/repos?sort=updated",
    {
      username: username,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  const { data } = response;

  for (let i = repoList.children.length - 1; i >= 0; i--) {
    repoList.removeChild(repoList.children[i]);
  }

  for (let i = 0; i < Math.min(3, data.length); i++) {
    const newRepo = document.createElement("li");
    newRepo.setAttribute("class", "repo-item");
    const repoName = document.createElement("a");
    repoName.setAttribute("href", data[i].html_url);
    repoName.textContent = data[i].name;
    newRepo.appendChild(repoName);

    const repoInfo = document.createElement("div");
    repoInfo.setAttribute("class", "repo-info");
    const stars = document.createElement("p");
    stars.setAttribute("class", "stars");
    stars.textContent = "Stars: ";
    const starCount = document.createElement("span");
    starCount.textContent = data[i].stargazers_count;
    stars.appendChild(starCount);
    repoInfo.appendChild(stars);
    newRepo.appendChild(repoInfo);
    repoList.appendChild(newRepo);
  }
};

username.addEventListener("keyup", async (event) => {
  try {
    await setUserProfile(event.target.value);
    await setUserRepos(event.target.value);
  } catch (error) {
    console.log(error);
    activateAlarm("존재하지 않는 사용자입니다.");
    resultBox.setAttribute("style", "display: none");
  }
});
