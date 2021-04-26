import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { Album } from './entities/album.entity';
import { Style } from './entities/style.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Style])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService], // <= permet d'être utilisé par un autre module : album-rating
})
export class AlbumsModule {}

/*

providers: [AlbumsSerice]

est l'écriture simplifiée de :

providers: [
  {
    provide: AlbumsService,
    useClass: AlbumsService,
  }
]

*/
