import { Request, Response } from 'express';
import db from '../database/connection';
import ConvertHourToMinutes from '../utils/ConvertHouerToMinutes';



interface scheduleItem {
    week_day: number,
    from: string,
    to: string
}



export default class ClassesController {

    async index( req: Request, res: Response){
        const filter = req.query;
        if(!filter.subject || !filter.week_day || !filter.time){
            res.status(400).json({
                error: "informe os filtros."
            })
        }

        const timeInMinutes = ConvertHourToMinutes(filter.time as string);
 
        const classes = await db('classes').select(['classes.*', 'users.*'])
        .where('classes.subject', '=', filter.subject as string)
        .join('users', 'classes.user_id','=', 'users.id')
        .whereExists(function(){
            this.select('class_schedule.*').from('class_schedule')
            .whereRaw('`class_schedule`.`class_id`=`classes`.`id`')
            .whereRaw('`class_schedule`.`week_day`= ??', [Number(filter.week_day)])
            .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
            .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
        });
        
        res.json(classes);
    }




    async create(req: Request, res: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;

        const trx = await db.transaction();
        try {

            const insertedId = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });

            const user_id = insertedId[0];

            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            })

            const class_id = insertedClassesIds[0];

            const classSchedule = schedule.map((scheduleItem: scheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: ConvertHourToMinutes(scheduleItem.from),
                    to: ConvertHourToMinutes(scheduleItem.to)
                }
            })

            await trx('class_schedule').insert(classSchedule);

            await trx.commit();

            return res.status(201).send();

        } catch (err) {

            await trx.rollback();

            return res.status(400).json({
                error: "Ocorreu um erro."
            })
        }
    }
}