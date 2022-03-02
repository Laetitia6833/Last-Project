import * as request from 'supertest';
import {Test} from '@nestjs/testing';
import {CommentsModule} from '../../src/comments/comments.module';
import {CommentsService} from '../../src/comments/comments.service';
import { INestApplication} from '@nestjs/common';

describe('Comments', () => {
    let app: INestApplication;
    let commentsService = { getAllComments: () => ['test']};

    beforeAll(async () => {
        const module = await Test.createTestingModule({ 
            imports: [CommentsModule],
        })
        .overrideProvider(CommentsService)
        .useValue(commentsService)
        .compile();

        app = module.createNestApplication();
        await app.init();
    });
    it('/GET comments',  () => {
        return request(app.getHttpServer())
        .get('/comments')
        .expect(200)
        .expect({
            data: commentsService.getAllComments(),
        });
    });
    afterAll(async () => {
        await app.close();
    });
});