import { smtpConfig } from '@config/smtp';
import { format } from 'date-fns';
import nodeSchedule from 'node-schedule';
import nodemailer from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import { ISchedulingDTO } from '../dtos/ISchedulingDTO';
import { ISchedulingRepository } from '../repositories/ISchedulingRepository';

@injectable()
export default class SendMailSchedulingService {
  constructor(
    @inject('SchedulingRepository')
    private schedulingRepository: ISchedulingRepository
  ) {}

  public async execute(data: ISchedulingDTO): Promise<void> {
    const transport = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: false,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Consulta do agendamentoo
    const schedule = await this.schedulingRepository.find(data.id);

    if (!schedule) {
      throw new Error('Não foi possível consultar o agendamento');
    }

    const stringDateSchedule = format(schedule.date, 'yyyy,M,d,k,m,s').split(
      ','
    );

    const numberDateSchedule = stringDateSchedule.map(Number);
    numberDateSchedule[1] -= 1;

    const date = new Date(
      numberDateSchedule[0],
      numberDateSchedule[1],
      numberDateSchedule[2],
      numberDateSchedule[3],
      numberDateSchedule[4],
      numberDateSchedule[5]
    );

    // Agendamento do envio de email
    nodeSchedule.scheduleJob(date, async () => {
      await transport.sendMail({
        from: 'To Do List <todolistoficial@gmail.com>',
        to: schedule.user.email,
        subject: 'Evento agendado para hoje',
        html: `<div style="color: black">${schedule.user.name}, não esqueça do seu agendamento para hoje: </div> \n <b style="color: black">${schedule.description}</b>`
      });

      // console.log(sendMail);
    });
  }
}
