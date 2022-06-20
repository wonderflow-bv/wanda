import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_DESIGN_TOKEN,
});

export const getRepoContent = async (path: string) => {
  const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'wonderflow-bv',
    repo: 'wanda',
    ref: 'next',
    path,
  });

  return data;
};
