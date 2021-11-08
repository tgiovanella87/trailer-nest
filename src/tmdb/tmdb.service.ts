import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TmdbService {
  findUrl: string;
  viewUrl: string;

  constructor(@Inject(CACHE_MANAGER) private cacheManager) {
    this.findUrl = process.env.TMDB_FIND_URL;
    this.viewUrl = process.env.TMDB_VIEW_URL;

    this.findUrl = this.findUrl.replace(
      '{{API_KEY}}',
      process.env.TMDB_API_KEY,
    );

    this.viewUrl = this.viewUrl.replace(
      '{{API_KEY}}',
      process.env.TMDB_API_KEY,
    );
  }

  async retrieveIdByMovieCode(movieCode: string): Promise<any> {
    console.info('recebido', movieCode);
    console.info(`movie_code_${movieCode}`);

    this.findUrl = this.findUrl.replace('{{MOVIE_CODE}}', movieCode);

    return new Promise(async (resolve, reject) => {
      const cachedData = await this.cacheManager.get(`movie_code_${movieCode}`);

      if (cachedData) {
        console.log('cached');
        resolve({ error: false, data: cachedData });
        return;
      }

      axios
        .get(this.findUrl, {})
        .then((responseData: any) => {
          if (!responseData.data.movie_results[0]?.id) {
            resolve({ error: true, message: 'Movie not found' });
            return;
          }

          const movieResultData = responseData.data?.movie_results[0];
          const movieData = {
            id: movieResultData.id,
            title: movieResultData.title,
          };
          this.cacheManager.set(`movie_code_${movieCode}`, movieData, {
            ttl: 60000,
          });

          resolve({
            error: false,
            data: movieData,
          });
        })
        .catch((error) => {
          reject({ error: true, message: error });
        });
    });
  }

  async retrieveMovieTrailer(movieID: string): Promise<any> {
    this.viewUrl = this.viewUrl.replace('{{MOVIE_ID}}', movieID);

    return new Promise(async (resolve, reject) => {
      const cachedData = await this.cacheManager.get(`movie_id_${movieID}`);

      if (cachedData) {
        resolve({ error: false, data: cachedData });
        return;
      }

      axios
        .get(this.viewUrl, {})
        .then((responseData: any) => {
          const trailerNode = responseData.data.results.find(
            (item) => (item.type = 'Trailer'),
          );

          if (!trailerNode) {
            resolve({ error: true, message: 'Trailer  not found' });
            return;
          }

          const trailerResultData = {
            id: movieID,
            name: trailerNode.name,
            type: trailerNode.type,
            official: trailerNode.official,
            youtube: `https://www.youtube.com/watch?v=${trailerNode.key}`,
          };

          this.cacheManager.set(`movie_id_${movieID}`, trailerResultData, {
            ttl: 60000,
          });
          resolve({ error: false, data: trailerResultData });
        })
        .catch((error) => {
          reject({ error: true, message: error });
        });
    });
  }
}
