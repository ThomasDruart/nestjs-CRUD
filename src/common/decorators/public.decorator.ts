import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// création d'un décorator custom pour les routes qui seront publiques (non bloquées par le guard)
