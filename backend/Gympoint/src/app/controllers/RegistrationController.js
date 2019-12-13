import * as Yup from 'yup';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';

class RegistrationController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const registrations = await Registration.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      order: [['created_at', 'DESC']],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });
    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .required()
        .moreThan(0),
      plan_id: Yup.number()
        .required()
        .moreThan(0),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, start_date, end_date, price } = await Registration.create(
      req.body
    );

    const registration = await Registration.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration', 'price'],
        },
      ],
    });

    await Queue.add(RegistrationMail.key, {
      registration,
    });

    return res.json({
      id,
      start_date,
      end_date,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const registration = await Registration.findByPk(req.params.id);
    const { id, start_date, end_date, price } = await registration.update(
      req.body
    );

    return res.json({
      id,
      start_date,
      end_date,
      price,
    });
  }

  async delete(req, res) {
    await Registration.destroy({
      where: { id: req.params.id },
    });
    return res.json({ message: 'Sucess' });
  }
}

export default new RegistrationController();
