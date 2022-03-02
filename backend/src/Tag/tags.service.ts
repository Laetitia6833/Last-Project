import { Injectable } from '@nestjs/common';
import { Model, Mongoose } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './tag.interface';
import { TagSchema } from './tag.schema';

@Injectable()
export class TagsService {
    constructor(@InjectModel('Tag') private tagModel: Model<Tag>) { }

    async getAllTag() {
        const tags = await this.tagModel.find().exec();
        return tags;

    }
    // async addTag(
    //     name: string,
    // ) {
    //     const newTag = new this.tagModel({
    //         name,
    //     });
    //     const res = await newTag.save();
    //     return res.id as string;
    // }

    async studentAdd(req) {
        // console.log(req.body);
        const tags = req.body

        let tagsArray = []
        tags.forEach(tag => {
            tag = tag.name
            let words = tag.split(' ')
            let arr = []
            words.forEach(word => {
                word = word.toLowerCase()
                word = word.charAt(0).toUpperCase() + word.slice(1)
                arr.push(word)
            });
            const obj = {
                name: (arr.join(' '))
            };

            tagsArray.push(obj)
        });

        let names = []
        tagsArray.forEach(tag => {
            names.push(tag.name)
        })

        let record = await this.tagModel.find({ name: { $in: names } })

        if (record.length === 0) {
            const newTags = this.tagModel.insertMany(tagsArray).then(res => {
                return res

            })
            return newTags
        } else {
            console.log('already exist');
        }
    }

}
