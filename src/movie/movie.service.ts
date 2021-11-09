import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MovieService {
  async retrieveMovieData(movieName: string) {
    const movieUrl = `${process.env.MOVIE_URL}/${movieName}`;

    return new Promise(async (resolve, reject) => {
      axios
        .get(movieUrl, {})
        .then((responseData: any) => {
          const returnTarget =
            responseData.data._embedded['viaplay:blocks'][0]._embedded[
              'viaplay:product'
            ].content.imdb;

          if (!returnTarget) {
            resolve({
              error: true,
              data: { error: true, message: 'Incorrect request' },
            });
            return;
          }

          resolve({ error: false, data: returnTarget });
        })
        .catch((error) => {
          reject({ error: true, message: error });
        });
    });
  }
}
