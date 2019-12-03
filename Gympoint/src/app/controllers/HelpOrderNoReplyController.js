import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderNoReplyController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const registrations = await HelpOrder.findAll({
      order: ['question'],
      limit: 20,
      offset: (page - 1) * 20,
      where: {
        answer_at: null,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['nome', 'email'],
        },
      ],
    });
    return res.json(registrations);
  }
}

export default new HelpOrderNoReplyController();
