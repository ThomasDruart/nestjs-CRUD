import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // @Type(() => Number) // La valeur reçue (Query) sera transformée en number.
  // Inutile de le mettre si on a enableImplicitConversions dans main.ts
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}
