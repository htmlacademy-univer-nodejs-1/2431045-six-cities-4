import { inject, injectable } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { Component } from '../../types/index.js';
import { types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import {
  DEFAULT_COMMENT_LIMIT,
  DEFAULT_COMMENT_MAX_LIMIT,
} from './comment.constant.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(
    dto: CreateCommentDto
  ): Promise<types.DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }

  public async findByOfferId(
    offerId: string,
    count?: number
  ): Promise<types.DocumentType<CommentEntity>[]> {
    const limit =
      count && count > DEFAULT_COMMENT_MAX_LIMIT
        ? DEFAULT_COMMENT_LIMIT
        : count;

    return this.commentModel
      .find({ offerId })
      .limit(limit ?? DEFAULT_COMMENT_LIMIT)
      .sort({createdAt: -1})
      .populate('userId')
      .exec();
  }
}
