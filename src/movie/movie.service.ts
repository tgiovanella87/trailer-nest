import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MovieService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager) {}

  async retrieveMovieData(movieName: string) {
    const movieUrl = `${process.env.MOVIE_URL}/${movieName}`;

    return new Promise(async (resolve, reject) => {
      const cachedData = await this.cacheManager.get(
        `viapay_movie_${movieName}`,
      );

      if (cachedData) {
        resolve({ error: false, data: cachedData });
        return;
      }

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

          this.cacheManager.set(`viapay_movie_${movieName}`, returnTarget, {
            ttl: 60000,
          });
          resolve({ error: false, data: returnTarget });
        })
        .catch((error) => {
          reject({ error: true, message: error });
        });
    });
  }
}
