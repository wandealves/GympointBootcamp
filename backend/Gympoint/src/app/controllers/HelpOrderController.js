import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const registrations = await HelpOrder.findAll({
      order: [['created_at', 'DESC']],
      limit: 10,
      offset: (page - 1) * 10,
      where: {
        student_id: req.params.id,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });
    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { question } = req.body;

    const { id, created_at } = await HelpOrder.create({
      question,
      student_id: req.params.id,
    });

    return res.json({
      id,
      question,
      created_at,
    });
  }
}

export default new HelpOrderController();
