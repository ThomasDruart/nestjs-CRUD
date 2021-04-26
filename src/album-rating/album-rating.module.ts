import { Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { AlbumRatingService } from './album-rating.service';

@Module({
  imports: [AlbumsModule],
  providers: [AlbumRatingService],
})
export class AlbumRatingModule {}
