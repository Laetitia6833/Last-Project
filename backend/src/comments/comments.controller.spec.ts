// // erreur sur result
// import {Test, TestingModule} from '@nestjs/testing';
// import {CommentsController} from "./comments.controller";
// import {CommentsService} from "./comments.service";


// describe('CommentsController', ()=> {
//     let commentsController: CommentsController;

//     let commentsService : CommentsService;

//     beforeEach(async () => {
//         const moduleRef = await Test.createTestingModule({
//             controllers: [CommentsController],
//             providers: [CommentsService],
//         }).compile();
       
//         commentsController = moduleRef.get<CommentsController>(CommentsController);
//         commentsService = moduleRef.get<CommentsService>(CommentsService);
//     });


//     describe('getAllComments', () => {
//         it('should return an array of all comments', async () => {
//             const result = ['test'];
//             jest.spyOn(commentsService, `getAllComments`).mockRejectedValue(() => result);

//             expect(await commentsController.getAllCommments()).toBe(result);

//         })
//     }) 
    

    // })






