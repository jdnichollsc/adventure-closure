import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  /**
   * Crob job to run every day at 5:00 PM (Monday-Friday)
   */
  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_5PM, {
    name: 'notifications'
  })
  async handleNotifications(): Promise<void> {
    this.logger.debug('Called every day at 5PM')

    try {
      // TODO: Send notifications using Push Notifications API, etc
      // await sendNotifications()
    } catch (error) {
      this.logger.error(error)
    }
  }
}