import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { getRandomItem, getRandomItems } from '../../helpers/index.js';

// const FIRST_WEEK_DAY = 1;
// const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const date = getRandomItem(this.mockData.dates);

    const city = getRandomItem(this.mockData.cities);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const photos = getRandomItems(this.mockData.photos).join(',');
    const premium = getRandomItem(this.mockData.premium);
    const favorite = getRandomItem(this.mockData.favorite);
    const rating = getRandomItem(this.mockData.ratings).toString();
    const housingType = getRandomItem(this.mockData.housingTypes);
    const rooms = getRandomItem(this.mockData.rooms).toString();
    const guests = getRandomItem(this.mockData.guests).toString();
    const price = getRandomItem(this.mockData.prices).toString();
    const amenities = getRandomItems(this.mockData.amenities).join(',');
    const author = getRandomItem(this.mockData.users);
    const commentsCount = getRandomItem(this.mockData.commentsCounts).toString();

    const coordinates = getRandomItem<{ latitude: number; longitude: number }>(
      this.mockData.coordinates
    );

    const createdDate = dayjs(date).format('MM-DD-YYYY');
    const stringAuthor = JSON.stringify(author);
    const stringAmenity = JSON.stringify(amenities);
    const stringGallery = JSON.stringify(photos);

    const resultOfGenerating = [
      title,
      description,
      createdDate,
      city,
      previewImage,
      stringGallery,
      premium,
      favorite,
      rating,
      housingType,
      rooms,
      guests,
      price,
      stringAmenity,
      stringAuthor,
      commentsCount,
      coordinates
    ].join('\t');

    console.log(resultOfGenerating);

    return resultOfGenerating;
  }
}
