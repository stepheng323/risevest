import { jest, describe, it, expect } from '@jest/globals';
import { signup } from '../user.controllers';
import * as serviceModule from '../../services';

jest.mock('../../services');

describe('User Controller', () => {
  it('should create a new user', async () => {
    const req: any = { validatedData: { email: 'test@example.com', firstname: 'John', lastname: 'Doe', password: 'password' } };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();

    const saveUserMock = jest.spyOn(serviceModule, 'saveUser');
    const date = new Date()
    saveUserMock.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      firstname: 'John',
      lastname: 'Doe',
      password: 'password',
      created_at: date,
      updated_at: date,
    });


    await signup(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    const responseJsonData = res.send.mock.calls[0][0].data;
    expect(responseJsonData).toBeDefined();
    expect(responseJsonData.email).toBe('test@example.com');
    expect(responseJsonData.firstname).toBe('John');
    expect(responseJsonData.lastname).toBe('Doe');
  });

  it('should handle service error when creating a user', async () => {
    const req: any = { validatedData: { email: 'test@example.com', firstname: 'John', lastname: 'Doe', password: 'password' } };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();

    const saveUserMock = jest.spyOn(serviceModule, 'saveUser');
    saveUserMock.mockRejectedValue(new Error('Failed to save user'));

    await signup(req, res, next);

    expect(next).toHaveBeenCalledWith(new Error('Failed to save user'));

  });

});
