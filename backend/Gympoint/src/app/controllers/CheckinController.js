import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const checkins = await Checkin.findAll({
      order: ['created_at'],
      limit: 10,
      offset: (page - 1) * 10,
      where: {
        student_id: req.params.id,
      },
      attributes: ['id', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });
    return res.json(checkins);
  }

  async store(req, res) {
    const dateUpdate = new Date();
    const checkins = await Checkin.findAll({
      where: {
        student_id: req.params.id,
        created_at: {
          [Op.between]: [startOfDay(dateUpdate), endOfDay(dateUpdate)],
        },
      },
    });

    if (checkins && checkins.length === 5) {
      return res
        .status(400)
        .json({ error: 'Não é possível mais de 5 checkins na semana.' });
    }

    await Checkin.create({
      student_id: req.params.id,
    });

    return res.json({ message: 'Checkins realizado' });
  }
}

export default new CheckinController();
