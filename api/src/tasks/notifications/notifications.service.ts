import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name)

  /**
   * Crob job to run every day at 5:00 PM (Monday-Friday)
   */
  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_5PM)
  async handleCron() {
    this.logger.debug('Called every day at 5PM')

    try {
      // TODO: Send notifications using Push Notifications API, etc
      // await sendNotifications()
    } catch (error) {
      this.logger.error(error)
    }
  }
}