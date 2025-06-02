import { Command } from './command.interface.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DefaultUserService, UserModel } from '../../shared/modules/user/index.js';
import { DEFAULT_USER_PASSWORD } from './command.constant.js';
import { Offer } from '../../shared/types/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { OfferSummaryModel } from '../../shared/modules/offer/offerSummary.entity.js';
import { FavoriteModel } from '../../shared/modules/favorite/favorite.entity.js';
import { CommentModel } from '../../shared/modules/comment/comment.entity.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private databaseClient: DatabaseClient;
  private offerService: OfferService;
  private logger: Logger;
  private salt!: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(
      this.logger,
      OfferModel,
      OfferSummaryModel,
      FavoriteModel,
      CommentModel
    );
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate(
      {
        ...offer.author,
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt
    );

    await this.offerService.create({
      userId: user.id,
      title: offer.title,
      description: offer.description,
      image: offer.previewImage,
      date: offer.date,
      cost: offer.price,
      city: offer.city,
      gallery: offer.photos,
      isPremium: offer.premium,
      isFavorite: offer.favorite,
      rating: offer.rating,
      apartmentType: offer.housingType,
      roomCount: offer.rooms,
      guestCount: offer.guests,
      amenities: offer.amenities,
    });
  }

  public getName(): string {
    return '--import';
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    port: string,
    dbname: string,
    salt: string
  ): Promise<void> {
    const uri = getMongoURI(login, password, port, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (err) {
      console.error('Cant import from this file');
      console.error(getErrorMessage(err));
    }
  }
}
