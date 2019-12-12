import * as Yup from 'yup';
import { Op } from 'sequelize';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { id = null, q = null, page = 1 } = req.query;
    let where = {};

    if (id) {
      where = { id };
    }

    if (q) {
      where = {
        name: {
          [Op.iLike]: `%${q}%`,
        },
      };
    }

    const students = await Student.findAll({
      order: [['created_at', 'DESC']],
      limit: 10,
      offset: (page - 1) * 10,
      where,
    });
    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    const { id, name, email } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student does exists.' });
    }

    const { id, name, email } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }
    const { id, name, age, weight, height } = student;
    await student.destroy();
    return res.json({ id, name, age, weight, height });
  }
}

export default new StudentController();
