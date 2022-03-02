// import { Test, TestingModule } from "@nestjs/testing";
// import { UsersController } from "./users.controller";
// import { UsersService } from "./users.service";


// describe('UsersController', () => {
//     let controller: UsersController;
//     let service: UsersService;

//     const mockUsersService = {};

//     beforeEach(async() => {
//         const module = await Test.createTestingModule({
//             controllers: [UsersController],
//             providers: [UsersService],
//         }).compile();

//         controller = module.get<UsersController>(UsersController);
//         service = module.get<UsersService>(UsersService);
//     });
//     describe('allUsers', () => {
//         it('should return all users in array', async () => {
//             const result = ['test']
//             jest.spyOn(UsersService, 'getAll').mockImplementation(()=> result);
//             expect(await UsersController.getAll()).toBe(result);
//         })
//     })
// }) 

// erreurs à la fin 