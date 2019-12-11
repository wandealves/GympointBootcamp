import React, { useRef, useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

// import history from '~/services/history';
import api from '~/services/api';

// import { addRequest, updateRequest } from '../../store/modules/student/actions';

import { Container, Header, Content } from './styles';

export default function Registration({ match }) {
  const { id } = match.params;
  const [student, setStudent] = useState({});

  // const dispatch = useDispatch();
  const btnSubmit = useRef();

  function submitForm() {
    btnSubmit.current.click();
  }

  // data, { resetForm }
  function handleSubmit() {
    // if (!id) dispatch(addRequest(data));
    // else dispatch(updateRequest(data, id));
    // resetForm();
  }

  function handleBack() {
    // history.push('/students');
  }

  async function getStudent() {
    const response = await api.get(`students/${id}`);
    setStudent(response.data);
  }

  useEffect(() => {
    if (id) {
      getStudent();
    }
  }, [id]);

  return (
    <Container>
      <Header>
        <h2>Cadastro de Matrícula</h2>
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
            Salvar
          </button>
        </div>
      </Header>
      <Content>
        <Form initialData={student} onSubmit={handleSubmit}>
          <Input name="student" label="ALUNO" autoComplete="off" />
          <div>
            <div>
              <Input
                name="plan"
                type="number"
                label="PLANO"
                className="width"
                autoComplete="off"
              />
            </div>
            <div>
              <Input
                name="start_date"
                type="number"
                label="DATA DE INÍCIO"
                className="width"
                autoComplete="off"
              />
            </div>
            <div>
              <Input
                name="end_date"
                type="number"
                label="DATA DE TÉRMINO"
                autoComplete="off"
                className="width disable"
                disabled
              />
            </div>
            <div>
              <Input
                name="price"
                type="number"
                label="VALOR FINAL"
                autoComplete="off"
                className="width disable"
                disabled
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

Registration.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Registration.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
