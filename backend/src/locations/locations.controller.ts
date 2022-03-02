import { Controller, Get, Param } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) { }

  @Get()
  async getAll() {
    return this.locationService.getAll()
  }

  @Get('byId/:id')
  async getLocationById(@Param('id') id) {
    return this.locationService.getLocationById(id)
  }

  @Get('byUser/:userId')
  async getLocationByUser(@Param('userId') userId) {
    return this.locationService.getLocationByUser(userId)
  }


}
