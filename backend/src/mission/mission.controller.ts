import { Body, Controller, Post, Param, ValidationPipe, Request, Get, UseGuards, Patch, Delete } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionCredentialsDto } from './dto/mission-credentials.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { runInThisContext } from 'vm';
import { RolesGuard } from 'src/Users/guards/roles.guard';
import { Role } from 'src/Users/role.enum';
import { Roles } from 'src/Users/roles.decorator';

@Controller('missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) { }

  @Get()
  async getAll(@Request() req) {
    return this.missionService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body(ValidationPipe) missionCredentialsDto: MissionCredentialsDto) {
    return this.missionService.addMission(req, missionCredentialsDto)
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(RolesGuard)
  // @Roles(Role.STUDENT)
  @Get('byStudentOrUser/:id')
  async getMissionByStudent(@Request() req, @Param('id') userId) {
    return this.missionService.getByStudentOrUserId(req, userId)
  }

  @Get('doneMissions/:userId')
  async getDoneMissions(@Param('userId') userId) {
    return this.missionService.doneMissions(userId)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.STUDENT)
  @Patch('seen')
  async missionSeen(@Request() req) {
    return this.missionService.missionSeen(req)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.STUDENT)
  @Patch('giveAnswer/:missionId')
  async giveAnswer(@Param('missionId') missionId, @Body() response: boolean) {
    return this.missionService.giveAnswer(missionId, response)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER)
  @Patch('missionDone/:missionId')
  async missionDone(@Param('missionId') missionId, @Body() done: boolean) {
    return this.missionService.missionDone(missionId, done)
  }

  @UseGuards(JwtAuthGuard)
  @Get('acceptedMissions')
  async acceptedMissions(@Request() req) {
    return this.missionService.acceptedMissions(req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('changeMissionStatus/:missionId')
  async changeMissionstatus(@Param('missionId') missionId, @Body() status) {
    return this.missionService.changeMissionStatus(missionId, status)
  }

@UseGuards(JwtAuthGuard)
@Delete(':missionId')
async deleteMission(@Request() req, @Param('missionId') missionId) {
  return this.missionService.deleteMission(missionId)
}
}
