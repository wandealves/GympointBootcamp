import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import { addRequest, updateRequest } from '~/store/modules/plan/actions';
import history from '~/services/history';
import api from '~/services/api';

import { Container, Header, Content } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number()
    .typeError('A duração (em meses) é obrigatória')
    .required('A duração (em meses) é obrigatória')
    .moreThan(0, 'A duração (em meses) deve ser maior que zero'),
  price: Yup.number()
    .typeError('O preço mensal é obrigatório')
    .required('O preço mensal é obrigatório')
    .moreThan(0, 'O preço mensal deve ser maior que zero'),
});

export default function Plan() {
  const { id } = useParams();
  const [plan, setPlan] = useState({});

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
    setPlan({ id: 0, duration: 0, price: 0, total: 0 });
  }

  function handleBack() {
    history.push('/plans');
  }

  useEffect(() => {
    if (id) {
      getPlan();
    }
  }, [id]);

  async function getPlan() {
    if (id) {
      const response = await api.get(`plans`, {
        params: { id },
      });
      if (response.data) {
        const data = response.data[0];
        data.total = data.price * data.duration;
        setPlan(data);
      }
    }
  }

  function handleDurationChange(duration) {
    setPlan({
      ...plan,
      duration,
      total: plan.price ? plan.price * duration : 0,
    });
  }

  function handleTotalPrice(event) {
    const { value } = event.target;
    setPlan({
      ...plan,
      price: value,
      total: plan.duration ? plan.duration * value : 0,
    });
  }

  return (
    <Container>
      <Header>
        <h2>{id ? 'Edição de Plano' : 'Cadastro de Plano'}</h2>
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
        <Form schema={schema} initialData={plan} onSubmit={handleSubmit}>
          <Input name="title" label="TÍTULO DO PLANO" autoComplete="off" />
          <div>
            <div>
              <Input
                name="duration"
                type="number"
                label="DURAÇÃO (em meses)"
                onChange={e => handleDurationChange(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div>
              <Input
                name="price"
                type="number"
                label="PREÇO MENSAL"
                onBlur={handleTotalPrice}
                step="0.01"
                autoComplete="off"
              />
            </div>
            <div>
              <Input
                name="total"
                type="number"
                label="PREÇO TOTAL"
                autoComplete="off"
                className="fieldDisable"
                step="0.01"
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
    }).isRequired,
  }).isRequired,
};
