export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: 'min length is 5, max is 1024',
  },
  rating: {
    min: 'Min 1',
    max: 'Max 5',
  },
  userId: {
    invalidFormat: 'userId field must be a valid id',
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id',
  },
} as const;
