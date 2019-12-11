import React, { useRef, useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

// import history from '~/services/history';
import api from '~/services/api';

// import { addRequest, updateRequest } from '../../store/modules/student/actions';

import { Container, Header, Content } from './styles';

export default function Plan({ match }) {
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
        <h2>Cadastro de Plano</h2>
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
          <Input name="name" label="TÍTULO DO PLANO" autoComplete="off" />
          <div>
            <div>
              <Input
                name="age"
                type="number"
                label="DURAÇÃO (em meses)"
                autoComplete="off"
              />
            </div>
            <div>
              <Input
                name="weight"
                type="number"
                label="PREÇO MENSAL"
                autoComplete="off"
              />
            </div>
            <div>
              <Input
                name="height"
                type="number"
                label="PREÇO TOTAL"
                autoComplete="off"
                className="fieldDisable"
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

Plan.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Plan.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
