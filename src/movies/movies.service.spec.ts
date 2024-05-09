import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { Movie } from './movies.entity';
import { CreateMovieDto } from './dto/createMovieDto';

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

const movieToCreate: CreateMovieDto = {
  title: 'movie3',
  year: 2005,
};

describe('MoviesService', () => {
  let service: MoviesService;

  const mockMoviesRepository = {
    find: jest.fn((): Movie[] => movies),
    create: jest.fn((dto: CreateMovieDto): CreateMovieDto => dto),
    findOneBy: jest.fn(
      (where: { id: string } | { title: string }): Movie | null =>
        movies.find((movie) =>
          Object.keys(where).find(
            (key) =>
              where[key as keyof typeof where] === movie[key as keyof Movie],
          ),
        ) || null,
    ),
    save: jest.fn((dto: CreateMovieDto) => ({ id: Date.now(), ...dto })),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: getRepositoryToken(Movie), useValue: mockMoviesRepository },
      ],
    }).compile();

    service = moduleRef.get<MoviesService>(MoviesService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all movies', () => {
    expect(service.findAll()).toEqual(movies);
  });

  it('findOne existing movie', () => {
    expect(service.findOne('1')).toEqual(movies[0]);
  });

  it('findOne missing user returns null', () => {
    expect(service.findOne('3')).toBeNull();
  });

  it('Create user returns dto with id', () => {
    expect(service.create(movieToCreate)).toEqual({
      id: expect.any(Number),
      ...movieToCreate,
    });
  });
});
