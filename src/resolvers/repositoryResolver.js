import { query } from '../db/index.js';
import * as githubService from '../services/githubService.js';


export const resolvers = {
  Query: {
    getRepositories: async () => {
        const { rows } = await query(
        'SELECT id, name, description, release_date, latest_release, unseen_updates FROM repositories'
        );
        return rows.map((row) => ({
        id: row.id.toString(),
        name: row.name,
        description: row.description,
        latestRelease: row.latest_release ? row.latest_release.toISOString() : null,
        releaseDate: row.release_date ? row.release_date.toISOString() : null,
        unseenUpdates: row.unseen_updates,
        }));
    }  
  },
  Mutation: {
    addRepository: async (_, { url }) => {
      const repoData = await githubService.fetchRepoData(url);
      const { name, description, latestRelease, releaseDate } = repoData;

      await query(
        `INSERT INTO repositories (name, description, latest_release, release_date) VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, description, latestRelease, releaseDate]
      );

      return repoData;
    },
    markAsSeen: async (_, { id }) => {
      await query('UPDATE repositories SET unseen_updates = false WHERE id = $1', [id]);
      return true;
    },
    refreshRepository: async (_, { id }) => {
      const repoData = await githubService.fetchRepoDataById(id);
      const { name, description, latestRelease, releaseDate } = repoData;

      await query(
        `UPDATE repositories SET name = $1, description = $2, latest_release = $3, release_date = $4 WHERE id = $5 RETURNING *`,
        [name, description, latestRelease, releaseDate, id]
      );

      return repoData;
    },
  },
};
