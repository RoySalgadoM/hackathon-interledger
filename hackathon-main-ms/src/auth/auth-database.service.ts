import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../common/schemas/user.schema';
import { Profile, ProfileDocument } from '../common/schemas/profile.schema';
import { ApiKey, ApiKeyDocument } from '../common/schemas/api-key.schema';

@Injectable()
export class AuthDatabaseService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    @InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKeyDocument>
  ) {}

  async getUserByEmail(email: string): Promise<UserDocument[]> {
    const key = String(email).trim().toLowerCase();

    return await this.userModel.aggregate([
      {
        $match: { email: key, deleted: false, active: true }
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'profile_id',
          foreignField: '_id',
          as: 'profile'
        }
      },
      {
        $unwind: '$profile'
      },
      {
        $project: {
          _id: 1,
          email: 1,
          first_name: 1,
          last_name: 1,
          role: 1,
          profile_id: 1,
          profile: 1,
          institution_id: 1
        }
      }
    ]);
  }

  async getProfileById(profileId: string): Promise<ProfileDocument> {
    return (await this.profileModel.findById(profileId)) as ProfileDocument;
  }

  async getApiKeyById(apiKeyId: string): Promise<ApiKeyDocument> {
    const apiKey = await this.apiKeyModel
      .aggregate([{ $match: { api_key: apiKeyId, delete: false } }])
      .then(([doc]: any[]) => doc);

    return apiKey;
  }

  async updateUserLastAccessDate(
    userId: string,
    lastAccessDate: Date
  ): Promise<void> {
    await this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      { $set: { last_access_date: lastAccessDate } }
    );
  }
}
