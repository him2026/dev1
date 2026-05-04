import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export default class CycleSettings extends Model {
  static table = 'cycle_settings'

  @field('user_id') userId!: string
  @field('avg_cycle_length') avgCycleLength!: number
  @field('avg_period_length') avgPeriodLength!: number
  @field('last_period_start') lastPeriodStart?: string
  @field('next_predicted_date') nextPredictedDate?: string
  @field('pcos_flag') pcosFlag!: boolean
}
