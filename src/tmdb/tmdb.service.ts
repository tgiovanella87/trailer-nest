import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Interface } from 'readline';
import { throwError } from 'rxjs';
import { CreateTmdbDto } from './dto/create-tmdb.dto';
import { UpdateTmdbDto } from './dto/update-imdb.dto';
import { IDataMovieResults } from './interfaces/IDataMovieResults';

@Injectable()
export class TmdbService {
  async retrieveIdByMovieCode(movieCode: string): Promise<any> {
    let findUrl: string = process.env.TMDB_FIND_URL;
    findUrl = findUrl.replace('{{API_KEY}}', process.env.TMDB_API_KEY);
    findUrl = findUrl.replace('{{MOVIE_CODE}}', movieCode);

    return new Promise((resolve, reject) => {
      axios
        .get(findUrl, {})
        .then((responseData: any) => {
          if (!responseData.data.movie_results[0]?.id) {
            reject({ error: true, message: 'movie not found' });
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
}
