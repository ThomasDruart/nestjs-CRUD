import { Test, TestingModule } from '@nestjs/testing';
import { AlbumRatingService } from './album-rating.service';

describe('AlbumRatingService', () => {
  let service: AlbumRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumRatingService],
    }).compile();

    service = module.get<AlbumRatingService>(AlbumRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
