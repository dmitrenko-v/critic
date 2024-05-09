import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movies.entity';
import { CreateMovieDto } from './dto/createMovieDto';
import { NotFoundInterceptor } from '../interceptors/NotFound';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  @Get()
  findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  findOne(@Param('id') id: string): Promise<Movie | null> {
    return this.movieService.findOne(id);
  }

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }
}
