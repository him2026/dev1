import { Model } from '@nozbe/watermelondb'
import { field, date, readonly } from '@nozbe/watermelondb/decorators'

export default class User extends Model {
  static table = 'users'

  @field('email') email!: string
  @field('full_name') fullName!: string
  @field('date_of_birth') dateOfBirth!: string
  @field('avatar_url') avatarUrl?: string
  @field('theme') theme!: string
  @field('sync_version') syncVersion!: number
  @readonly @date('created_at') createdAt!: number
}
