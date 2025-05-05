import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/creat-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OfferSummaryEntity } from './offerSummary.entity.js';
import { CityType } from '../../types/index.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(
    userId: string,
    offerId: string
  ): Promise<(DocumentType<OfferEntity> & { isFavorite: boolean }) | null>;
  find(
    userId: string,
    count?: number
  ): Promise<DocumentType<OfferSummaryEntity>[]>;
  updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremOffersByTown(
    userId: string,
    city: CityType
  ): Promise<DocumentType<OfferSummaryEntity>[]>;
  getUserFavorites(userId: string): Promise<DocumentType<OfferSummaryEntity>[]>;
  addFavorite(
    userId: string,
    offerId: string
  ): Promise<DocumentType<OfferSummaryEntity>>;
  deleteFavorite(userId: string, offerId: string): Promise<void>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
