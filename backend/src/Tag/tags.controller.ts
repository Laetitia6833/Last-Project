import { Body, Controller, Get, Post, Request, Res, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../Users/guards/roles.guard';
import { Role } from '../Users/role.enum';
import { Roles } from '../Users/roles.decorator';

import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) { }

    @Get()
    async getAllTag() {
        return this.tagsService.getAllTag();
    }
    // @Post()
    // async addTag(
    //     @Body('name') name: string,
    // ) {
    //     const generatedId = await this.tagsService.addTag(
    //         name,
    //     );
    //     return {id: generatedId};
    // }

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Post('studentAdd')
    async studentAddTag(@Request() req) {
        return this.tagsService.studentAdd(req)

    }

}
