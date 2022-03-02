// import {Test, TestingModule} from '@nestjs/testing';
// import { TagsController } from './tags.controller';
// import { TagsService } from './tags.service';



// describe('CommentsController', ()=> {
//     let tagsController: TagsController;

//     let tagsService : TagsService;

//     beforeEach(async () => {
//         const moduleRef = await Test.createTestingModule({
//             controllers: [TagsController],
//             providers: [TagsService],
//         }).compile();
       
//         tagsController = moduleRef.get<TagsController>(TagsController);
//         tagsService = moduleRef.get<TagsService>(TagsService);
//     });


//     describe('getAllComments', () => {
//         it('should return an array of all tags', async () => {
//             const result = ['test'];
//             jest.spyOn(tagsService, `getAllTag`).mockRejectedValue(() => result);

//             expect(await tagsController.getAllTag()).toBe(result);

//         })
//     }) 
    

//     })