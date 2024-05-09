import { Test } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from './movies.entity';

const movies: Movie[] = [
  {
    id: '1',
    title: 'movie1',
    year: 2002,
  },
  {
    id: '2',
    title: 'movie2',
    year: 2003,
  },
];

describe('MoviesController', () => {
  let controller: MoviesController;

  const mockMovieService = {
    findAll: jest.fn((): Movie[] => movies),
    findOne: jest.fn(
      (id: string): Movie | null =>
        movies.find((movie) => movie.id === id) || null,
    ),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    })
      .overrideProvider(MoviesService)
      .useValue(mockMovieService)
      .compile();

    controller = moduleRef.get<MoviesController>(MoviesController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return all movies', () => {
    expect(controller.findAll()).toEqual(movies);
  });

  it('findOne existing movie', () => {
    expect(controller.findOne('1')).toEqual(movies[0]);
  });

  it('findOne missing movie returns null', () => {
    expect(controller.findOne('3')).toBeNull();
  });
});
