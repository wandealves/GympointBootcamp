import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import { addRequest, updateRequest } from '~/store/modules/student/actions';
import api from '~/services/api';
import history from '~/services/history';
import { Container, Header, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .typeError('A idade é obrigatória')
    .required('A idade é obrigatória')
    .moreThan(0, 'A idade deve ser maior que zero'),
  weight: Yup.number()
    .typeError('O peso é obrigatório')
    .required('O peso é obrigatório')
    .moreThan(0, 'O peso deve ser maior que zero'),
  height: Yup.number()
    .typeError('A altura é obrigatória')
    .required('A altura é obrigatória')
    .moreThan(0, 'A altura deve ser maior que zero'),
});

export default function Student() {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const dispatch = useDispatch();
  const loading = useSelector(state => state.student.loading);

  const btnSubmit = useRef();

  function submitForm() {
    btnSubmit.current.click();
  }

  function handleSubmit(data, { resetForm }) {
    if (!id) dispatch(addRequest(data));
    else dispatch(updateRequest(data, id));

    resetForm();
  }

  function handleBack() {
    history.push('/students');
  }

  useEffect(() => {
    async function getStudent() {
      if (id) {
        const response = await api.get(`students`, {
          params: { id },
        });
        if (response.data) setStudent(response.data[0]);
      }
    }
    getStudent();
  }, [id]);

  return (
    <Container>
      <Header>
        <h2>Cadastro do Aluno</h2>
        <div>
          <button type="button" className="btn-back" onClick={handleBack}>
            <MdKeyboardArrowLeft
              size={20}
              color="#fff"
              style={{ marginRight: '5' }}
            />{' '}
            Voltar
          </button>
          <button type="button" className="btn-save" onClick={submitForm}>
            <MdCheck size={20} color="#fff" style={{ marginRight: '5' }} />{' '}
            {loading ? 'Enviando...' : 'Salvar'}
          </button>
        </div>
      </Header>
      <Content>
        <Form schema={schema} initialData={student} onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="John Doe"
            label="NOME COMPLETO"
            autoComplete="off"
          />
          <Input
            name="email"
            type="email"
            placeholder="exemplo@email.com"
            label="ENDEREÇO DE E-MAIL"
            autoComplete="off"
          />
          <div>
            <div>
              <Input
                name="age"
                type="number"
                label="IDADE"
                autoComplete="off"
              />
            </div>
            <div>
              <Input
                name="weight"
                type="number"
                label="PESO (em kg)"
                autoComplete="off"
                step="0.01"
              />
            </div>
            <div>
              <Input
                name="height"
                type="number"
                label="ALTURA"
                autoComplete="off"
                step="0.01"
              />
            </div>
          </div>
          <button ref={btnSubmit} hidden type="submit">
            Send
          </button>
        </Form>
      </Content>
    </Container>
  );
}

Student.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
