import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, Offer } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_PRICE = 50;
const MAX_PRICE = 1000;
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
    constructor(private readonly mockData: MockServerData) {}
  
    public generate(): string {
      const title = getRandomItem<string>(this.mockData.titles);
      const description = getRandomItem<string>(this.mockData.descriptions);

      const city = getRandomItem<string>(this.mockData.cities);
      const previewImage = getRandomItem<string>(this.mockData.previewImages);
      const photos = getRandomItems<string[]>(this.mockData.photos).join(',');
      const premium = getRandomItem<boolean>(this.mockData.premium);
      const favorite = getRandomItem<boolean>(this.mockData.favorite);
      const rating = getRandomItem<number>(this.mockData.ratings).toString();
      const housingType = getRandomItem<string>(this.mockData.housingTypes);
      const rooms = getRandomItem<number>(this.mockData.rooms).toString();
      const guests = getRandomItem<number>(this.mockData.guests).toString();
      const price = getRandomItem<number>(this.mockData.prices).toString();
      const amenities = getRandomItems<string[]>(this.mockData.amenities).join(',');
      const author = getRandomItem<string>(this.mockData.users);
      const email = getRandomItem<string>(this.mockData.emails);
      const avatar = getRandomItem<string>(this.mockData.avatars);
      const commentsCount = getRandomItem<number>(this.mockData.commentsCounts).toString();
      const coordinates = getRandomItem<{ latitude: number; longitude: number }>(
        this.mockData.coordinates
      );
  
      const createdDate = dayjs()
        .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
        .toISOString();
  
      return [
        title, description, createdDate, city, previewImage, photos,
        premium, favorite, rating, housingType, rooms, guests, price, amenities,
        author, email, avatar, commentsCount, coordinates.latitude, coordinates.longitude
      ].join('\t');
    }
  }