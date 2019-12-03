import * as Yup from 'yup';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Mail from '../../lib/Mail';

class RegistrationController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const registrations = await Registration.findAll({
      order: ['start_date'],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
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
          attributes: ['nome', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration', 'price'],
        },
      ],
    });

    await Mail.sendMail({
      to: `${registration.student.nome} <${registration.student.email}>`,
      subject: 'Matrícula Realizada',
      text: `Bem vindo ${registration.student.nome} ao Gympoint, sua matrícula foi cadastrada, ${registration.plan.title} : Plano de ${registration.plan.duration} mês(es) por R$${registration.plan.price}/mềs.`,
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
