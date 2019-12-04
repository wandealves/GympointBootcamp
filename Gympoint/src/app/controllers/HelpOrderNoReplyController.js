import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderNoReplyController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const registrations = await HelpOrder.findAll({
      order: ['question'],
      limit: 10,
      offset: (page - 1) * 10,
      where: {
        answer_at: null,
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
}

export default new HelpOrderNoReplyController();
