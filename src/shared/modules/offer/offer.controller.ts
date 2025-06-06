import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpMethod,
  PrivateRouteMiddleware, UploadFileMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface.js';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { fillDTO, getCoordinatesByTown } from '../../helpers/common.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { ParamsDictionary } from 'express-serve-static-core';
import { QueryCount } from './type/query-count.type.js';
import { CommentRdo, CommentService } from '../comment/index.js';
import { DEFAULT_DISCUSSED_OFFER_COUNT, DEFAULT_NEW_OFFER_COUNT } from './offer.constant.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { UploadImageRdo } from './rdo/upload-image.rdo.js';
import { OfferSummaryRdo } from './rdo/offerSummary.rdo.js';
import { ParamCity } from './type/param-town.type.js';

@injectable()
export default class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');


    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.getAllOffers });

    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavoriteOffers,
      middlewares: [new PrivateRouteMiddleware()],
    });

    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.getOfferById,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]});

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.createOffer,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });


    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Post,
      handler: (req, res, _next) =>
        this.addToFavourites(req as Request<ParamOfferId>, res),
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Delete,
      handler: (req, res, _next) =>
        this.removeFromFavourites(req as Request<ParamOfferId>, res),
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });


    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    this.addRoute({ path: '/bundles/new', method: HttpMethod.Get, handler: this.getNew });
    this.addRoute({ path: '/bundles/discussed', method: HttpMethod.Get, handler: this.getDiscussed });

    this.addRoute({
      path: '/:offerId/image',
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
      ]
    });


    this.addRoute({
      path: '/:city/premium',
      method: HttpMethod.Get,
      handler: (req, res, _next) =>
        this.getPremiumOffersByCity(req as Request<ParamCity>, res),
    });
  }

  public async getAllOffers({
    query,
    tokenPayload,
  }: Request<ParamsDictionary, unknown, unknown, QueryCount>,
  res: Response
  ): Promise<void> {
    const count = query.count ? parseInt(query.count, 10) : 60;

    const userId = tokenPayload ? tokenPayload.id : undefined;

    const offers = await this.offerService.find(count, userId);

    this.ok(res, fillDTO(OfferSummaryRdo, offers));
  }


  public async uploadImage({ params, file, tokenPayload } : Request<ParamOfferId>, res: Response) {
    const { offerId } = params;
    const updateDto = { previewImage: file?.filename };
    await this.offerService.updateById(offerId, updateDto, tokenPayload.id);
    this.created(res, fillDTO(UploadImageRdo, updateDto));
  }

  public async createOffer(
    { body, tokenPayload }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({
      ...body,
      userId: tokenPayload.id,
      commentCount: 0,
      coordinates: getCoordinatesByTown(body.city),
    });
    const offer = await this.offerService.findById(
      result.id,
      result.userId.toString()
    );

    this.created(res, fillDTO(OfferRdo, offer));
  }


  public async getOfferById(
    { params, tokenPayload }: Request,
    res: Response
  ): Promise<void> {
    const userId = tokenPayload ? tokenPayload.id.toString() : null;
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId, userId);

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async update({ body, params, tokenPayload }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body, tokenPayload.id);

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async delete({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId, tokenPayload.id);

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async getNew(_req: Request, res: Response) {
    const newOffers = await this.offerService.findNew(DEFAULT_NEW_OFFER_COUNT);
    this.ok(res, fillDTO(OfferRdo, newOffers));
  }

  public async getDiscussed(_req: Request, res: Response) {
    const discussedOffers = await this.offerService.findDiscussed(DEFAULT_DISCUSSED_OFFER_COUNT);
    this.ok(res, fillDTO(OfferRdo, discussedOffers));
  }


  public async getPremiumOffersByCity(
    { params, tokenPayload }: Request<ParamCity>,
    res: Response
  ): Promise<void> {
    const userId = tokenPayload ? tokenPayload.id.toString() : null;
    const { city } = params;
    const offers = await this.offerService.findPremOffersByCity(userId, city);

    this.ok(res, fillDTO(OfferSummaryRdo, offers));
  }

  public async getFavoriteOffers(
    { tokenPayload }: Request,
    res: Response
  ): Promise<void> {
    const offers = await this.offerService.getUserFavorites(tokenPayload.id);

    this.ok(res, fillDTO(OfferSummaryRdo, offers));
  }

  public async addToFavourites(
    { params, tokenPayload }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const offer = await this.offerService.addFavorite(
      tokenPayload.id,
      params.offerId
    );

    this.ok(res, fillDTO(OfferSummaryRdo, offer));
  }

  public async removeFromFavourites(
    { params, tokenPayload }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const isDeleted = await this.offerService.deleteFavorite(
      tokenPayload.id,
      params.offerId
    );

    this.ok(res, isDeleted === true);
  }
}
