import Student from '../models/Student';
import Registration from '../models/Registration';

class StudentAuthController {
  async store(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student does exists.' });
    }

    const registrations = await Registration.findAll({
      where: {
        student_id: student.id,
      },
    });

    if (!registrations) {
      return res.status(400).json({ error: 'Registration does exists.' });
    }

    if (registrations.length === 0) {
      return res.status(400).json({ error: 'Registration does exists.' });
    }

    const active = registrations.some(registration => registration.active);

    if (!active) {
      return res.status(400).json({ error: 'Inactive student.' });
    }

    return res.json(student);
  }
}

export default new StudentAuthController();
