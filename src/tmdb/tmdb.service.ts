import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Interface } from 'readline';
import { throwError } from 'rxjs';
import { CreateTmdbDto } from './dto/create-tmdb.dto';
import { UpdateTmdbDto } from './dto/update-imdb.dto';

@Injectable()
export class TmdbService {
  findUrl: string;
  viewUrl: string;

  constructor() {
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
    this.findUrl = this.findUrl.replace('{{MOVIE_CODE}}', movieCode);

    return new Promise((resolve, reject) => {
      axios
        .get(this.findUrl, {})
        .then((responseData: any) => {
          if (!responseData.data.movie_results[0]?.id) {
            reject({ error: true, message: 'Movie not found' });
            return;
          }

          const movieResultData = responseData.data?.movie_results[0];
          resolve({ id: movieResultData.id, title: movieResultData.title });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  async retrieveMovieTrailer(movieID: string): Promise<any> {
    this.viewUrl = this.viewUrl.replace('{{MOVIE_ID}}', movieID);

    return new Promise((resolve, reject) => {
      axios.get(this.viewUrl, {}).then((responseData: any) => {
        const trailerNode = responseData.data.results.find(
          (item) => (item.type = 'Trailer'),
        );

        if (!trailerNode) {
          reject({ error: true, message: 'Trailer  not found' });
          return;
        }

        const trailerResultData = {
          id: movieID,
          name: trailerNode.name,
          type: trailerNode.type,
          official: trailerNode.official,
          youtube: `https://www.youtube.com/watch?v=${trailerNode.key}`,
        };

        resolve(trailerResultData);
      });
    });
  }
}
