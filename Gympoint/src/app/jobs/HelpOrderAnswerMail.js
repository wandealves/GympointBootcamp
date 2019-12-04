import Mail from '../../lib/Mail';

class HelpOrderAnswerMail {
  get key() {
    return 'HelpOrderAnswerMail';
  }

  async handle({ data }) {
    const { helpOrder, question, answer } = data;

    await Mail.sendMail({
      to: `${helpOrder.student.nome} <${helpOrder.student.email}>`,
      subject: 'Pedido Respondido',
      text: `Seu pedido da questão ${question} foi respondido ${answer}`,
    });
  }
}

export default new HelpOrderAnswerMail();
