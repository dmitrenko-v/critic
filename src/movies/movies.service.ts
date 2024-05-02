import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movies.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/createMovieDto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  findOne(id: string): Promise<Movie | null> {
    return this.moviesRepository.findOneBy({ id });
  }

  create(movieData: CreateMovieDto) {
    const movie: Movie = this.moviesRepository.create(movieData);
    return this.moviesRepository.save(movie);
  }
}
