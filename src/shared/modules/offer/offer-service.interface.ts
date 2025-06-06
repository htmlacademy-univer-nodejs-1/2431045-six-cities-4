import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OfferSummaryEntity } from './offerSummary.entity.js';
import { CityType } from '../../types/index.js';
import { DocumentExists } from '../../types/index.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(
    offerId: string,
    userId: string | null
  ): Promise<(DocumentType<OfferEntity> & { isFavorite: boolean }) | null>;
  find(count:number, userId?: string): Promise<OfferSummaryEntity[]>;
  updateById(
    offerId: string,
    dto: UpdateOfferDto,
    userId: string
  ): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremOffersByCity(
    userId: string | null,
    city: CityType
  ): Promise<OfferSummaryEntity[]>;
  getUserFavorites(userId: string): Promise<DocumentType<OfferSummaryEntity>[]>;
  addFavorite(
    userId: string,
    offerId: string
  ): Promise<DocumentType<OfferSummaryEntity>>;
  deleteFavorite(userId: string, offerId: string): Promise<boolean>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  exists(documentId: string): Promise<boolean>;
  findNew(count: number): Promise<DocumentType<OfferEntity>[]>;
  findDiscussed(count: number): Promise<DocumentType<OfferEntity>[]>;
}
