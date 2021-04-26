import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';

@Injectable()
export class AlbumRatingService {
  constructor(private readonly albumsService: AlbumsService) {} // dependency injection
}
