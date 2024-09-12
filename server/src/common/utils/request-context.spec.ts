import { Request } from 'express';

import { createRequestContext } from './request-context';
import { Key } from '@common/enums/keys.enum';
import { UserDto } from '@admin/user/dtos/user.dto';

describe('createRequestContext function', () => {
  const user = new UserDto();

  const request = {
    url: 'someUrl',
    ip: 'someIP',
    user,
    header: jest.fn().mockImplementation((header) => {
      switch (header) {
        case Key.RequestIdTokenHeader:
          return '123';
        case Key.ForwardedForTokenHeader:
          return 'forwardedIP';
        default:
          break;
      }
    }),
  } as unknown as Request;

  const expectedOutput = {
    url: 'someUrl',
    ip: 'forwardedIP',
    requestId: '123',
    user,
  };

  it('should return RequestContext', () => {
    expect(createRequestContext(request)).toEqual(expectedOutput);
  });
});
