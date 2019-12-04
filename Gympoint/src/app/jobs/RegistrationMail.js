import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { registration } = data;

    await Mail.sendMail({
      to: `${registration.student.nome} <${registration.student.email}>`,
      subject: 'Matrícula Realizada',
      text: `Bem vindo ${registration.student.nome} ao Gympoint, sua matrícula foi cadastrada, ${registration.plan.title} : Plano de ${registration.plan.duration} mês(es) por R$${registration.plan.price}/mềs.`,
    });
  }
}

export default new RegistrationMail();
