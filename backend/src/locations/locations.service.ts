import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/Users/interfaces/user.interface";

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel('Location') private locationModel: Model<Location>,
    @InjectModel('User') private userModel: Model<User>
  ) { }

  async getAll() {
    return this.locationModel.find().sort('location_code')
  }

  async getLocationById(id) {
    return this.locationModel.findOne({ location_id: id })
  }

  async getLocationByUser(userId) {
    const user = await this.userModel.findOne({ _id: userId })

    if (user.location) {
      const location = await this.locationModel.findOne({ location_id: user.location })
      return location
    }

  }
}
