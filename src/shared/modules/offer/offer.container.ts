import { Container } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../types/index.js';
import { DefaultOfferService } from './default-offer.service.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { types } from '@typegoose/typegoose';
import { OfferSummaryEntity, OfferSummaryModel } from './offerSummary.entity.js';
import { Controller } from '../../libs/rest/index.js';
import OfferController from './offer.controller.js';
import { FavoriteEntity, FavoriteModel } from '../favorite/favorite.entity.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<types.ModelType<OfferSummaryEntity>>(Component.OfferSummaryModel).toConstantValue(OfferSummaryModel);
  offerContainer.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();
  offerContainer.bind<types.ModelType<FavoriteEntity>>(Component.FavoriteModel).toConstantValue(FavoriteModel);

  return offerContainer;
}
