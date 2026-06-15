const octokit = require("../config/github");

const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;

async function createPR({ branch, title }) {
  return await octokit.pulls.create({
    owner: OWNER,
    repo: REPO,
    title,
    head: branch,
    base: "main",
  });
}

async function listPRs() {
  return await octokit.pulls.list({
    owner: OWNER,
    repo: REPO,
    state: "open",
  });
}

module.exports = {
  createPR,
  listPRs,
};