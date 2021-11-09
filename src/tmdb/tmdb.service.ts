import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TmdbService {
  async retrieveIdByMovieCode(movieCode: string): Promise<any> {
    let findUrl = process.env.TMDB_FIND_URL.replace(
      '{{API_KEY}}',
      process.env.TMDB_API_KEY,
    );
    findUrl = findUrl.replace('{{MOVIE_CODE}}', movieCode);

    return new Promise(async (resolve, reject) => {
      axios
        .get(findUrl, {})
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
    let viewUrl = process.env.TMDB_VIEW_URL.replace(
      '{{API_KEY}}',
      process.env.TMDB_API_KEY,
    );
    viewUrl = viewUrl.replace('{{MOVIE_ID}}', movieID);

    return new Promise(async (resolve, reject) => {
      axios
        .get(viewUrl, {})
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
            trailer_url: `https://www.youtube.com/watch?v=${trailerNode.key}`,
          };
          resolve({ error: false, data: trailerResultData });
        })
        .catch((error) => {
          reject({ error: true, message: error });
        });
    });
  }
}
