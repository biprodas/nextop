import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';

describe('UsersController', () => {
  let controller: UserController;
  let fakeUsersService: Partial<UserService>;

  beforeEach(async () => {
    fakeUsersService = {
      // findOne: (id: string) => {
      //   return Promise.resolve({ id, username: 'biprodas@gmail.com', password: '12345' } as User)
      // },
      // findAll: (username: string) => {
      //   return Promise.resolve([{ id: '1', username: username, password: '12345' } as User])
      // },
      // remove: () => {},
      // update: () => {}
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('findUsers returns a list of users with the given email', async() => {
  //   const users = await controller.findUsers('biprodas@gmail.com');
  //   expect(users.length).toEqual(1);
  //   expect(users[0].email).toEqual('biprodas@gmail.com');
  // });

  // it('findUser returns a single user with the given id', async() => {
  //   const user = await controller.findUser(1);
  //   expect(user).toBeDefined();
  // });

  // TODO:
  // it('findUser throws error if user with given id is not found', async() => {
  //   fakeUsersService.findOne = () => null;
  //   await expect(controller.findUser(1)).rejects.toThrowError(NotFoundException);

  //   // try{
  //   //   await controller.findUser(1);
  //   // } catch(err){
  //   //   done();
  //   // }
  // });
});
