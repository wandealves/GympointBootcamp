import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const plans = await Plan.findAll({
      order: ['title'],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, title } = await Plan.create(req.body);

    return res.json({
      id,
      title,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plan.findByPk(req.params.id);
    const { id, title } = await plan.update(req.body);

    return res.json({
      id,
      title,
    });
  }

  async delete(req, res) {
    await Plan.destroy({
      where: { id: req.params.id },
    });
    return res.json({ message: 'Sucess' });
  }
}

export default new PlanController();
