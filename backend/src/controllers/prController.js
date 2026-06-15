const { createPR, listPRs } = require("../services/githubService");

// CREATE PR (Engineer submits)
const createPullRequest = async (req, res) => {
  try {
    const user = req.user;

    const branchName = `engineer-${user.id}-${Date.now()}`;

    const pr = await createPR({
      branch: branchName,
      title: `Test Request by ${user.name || user.email}`,
    });

    return res.json({
      message: "Pull request created",
      url: pr.data.html_url,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to create PR",
      details: err.message,
    });
  }
};

// GET PR LIST (Head dashboard)
const getPullRequests = async (req, res) => {
  try {
    const prs = await listPRs();

    return res.json(prs.data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to fetch PRs",
    });
  }
};

module.exports = {
  createPullRequest,
  getPullRequests,
};