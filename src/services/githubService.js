import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

const fetchRepoData = async (url) => {
  const [owner, repo] = url.replace('https://github.com/', '').split('/');
  const { data } = await octokit.repos.get({ owner, repo });
  
  return {
    name: data.name,
    description: data.description,
    latestRelease: data.pushed_at,
    releaseDate: data.updated_at,
  };
};

export { fetchRepoData };