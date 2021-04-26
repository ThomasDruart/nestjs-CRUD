import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Album } from './entities/album.entity';
import { Style } from './entities/style.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Style)
    private readonly styleRepository: Repository<Style>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    //return this.albumRepository.find();  <= Avant création de la table styles
    const { limit, offset } = paginationQuery;
    return this.albumRepository.find({
      relations: ['styles'], // relations = left join // 'styles' correspond au nom de la colone dans l'entité Album
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne(id, {
      relations: ['styles'],
    });
    if (!album) {
      return `Sorry, no album found with id ${id}`;
    }
    return album;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const styles = await Promise.all(
      createAlbumDto.styles.map((style) => this.preloadStyleByName(style)),
    ); // On map sur tous les styles appliqués au nouvel album

    const newAlbum = await this.albumRepository.create({
      ...createAlbumDto,
      styles,
    });
    return this.albumRepository.save(newAlbum);
  }

  async remove(id: string) {
    const albumtoRemove = await this.albumRepository.findOne(id);
    return this.albumRepository.remove(albumtoRemove);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const styles =
      updateAlbumDto.styles &&
      (await Promise.all(
        updateAlbumDto.styles.map((style) => this.preloadStyleByName(style)),
      )); // les styles étant optionnels, on vérifie qu'il y en a dans l'update

    const albumToUpdate = await this.albumRepository.preload({
      id: +id,
      ...updateAlbumDto,
      styles,
    });
    if (!albumToUpdate) {
      throw new NotFoundException(`album #${id} not found`);
    }
    return this.albumRepository.save(albumToUpdate);
  }

  //vérif si le style musical est présent dans la bdd, sinon ajout du nouveau style dans la table
  private async preloadStyleByName(name: string): Promise<Style> {
    const existingStyle = await this.styleRepository.findOne({ name });
    if (existingStyle) {
      return existingStyle;
    }
    return this.styleRepository.create({ name });
  }
}
