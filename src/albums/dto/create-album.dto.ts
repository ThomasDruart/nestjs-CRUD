import { IsInt, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  readonly artist: string;

  @IsString()
  readonly title: string;

  @IsInt()
  readonly year: number;

  @IsString({ each: true })
  readonly styles: string[];
}
