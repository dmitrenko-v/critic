import { IsNotEmpty, Max } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;

  @Max(new Date().getFullYear() + 1)
  year: number;
}
