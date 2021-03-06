import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { id = null, page = 1, limit = 10 } = req.query;

    let where = {};
    if (id) {
      where = { id };
    }

    const plans = await Plan.findAll({
      order: [['created_at', 'DESC'], ['title']],
      limit,
      offset: (page - 1) * limit,
      where,
    });
    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .required()
        .moreThan(0),
      price: Yup.number()
        .required()
        .moreThan(0),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .required()
        .moreThan(0),
      price: Yup.number()
        .required()
        .moreThan(0),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plan.findByPk(req.params.id);
    const { id, title, duration, price } = await plan.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
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
