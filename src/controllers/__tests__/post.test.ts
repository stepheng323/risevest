import { jest, describe, it, expect } from '@jest/globals';
import { createPost } from '../post.controller';
import * as serviceModule from '../../services';

jest.mock('../../services');

describe('Post Controller', () => {
  it('should create a new post', async () => {
    const req: any = { user: { id: 'user_id' }, validatedData: { title: 'Test Post', content: 'Post content' } };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();

    const date = new Date();
    const savePostMock = jest.spyOn(serviceModule, 'savePost');
    savePostMock.mockResolvedValue({
      id: '1',
      title: 'Test Post',
      content: 'Post content',
      user_id: 'user_id',
      created_at: date,
      updated_at: date,
    });

    await createPost(req, res, next);

    expect(savePostMock).toHaveBeenCalledWith({
      title: 'Test Post',
      content: 'Post content',
      user_id: 'user_id',
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      success: true,
      message: 'Post created successfully',
      data: {
        id: '1',
        title: 'Test Post',
        content: 'Post content',
        user_id: 'user_id',
        created_at: date,
        updated_at: date
      },
    });
  });

  it('should handle an error while creating a post', async () => {
    const req: any = { user: { id: 'user_id' }, validatedData: { title: 'Test Post', content: 'Post content' } };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();

    const errorMessage = 'An error occurred while saving the post';
    const savePostMock = jest.spyOn(serviceModule, 'savePost');
    savePostMock.mockRejectedValue(new Error(errorMessage));

    await createPost(req, res, next);

    expect(savePostMock).toHaveBeenCalledWith({
      title: 'Test Post',
      content: 'Post content',
      user_id: 'user_id',
    });

    expect(next).toHaveBeenCalledWith(new Error(errorMessage));
  });

});
