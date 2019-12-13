import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { format, addMonths, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import { formatPrice } from '~/util/format';
import api from '~/services/api';
import history from '~/services/history';
import InputAsyncSelect from '~/components/InputAsyncSelect';
import DatePicker from '~/components/InputDatePicker';
import ReactSelect from '~/components/InputSelect';
import { Container, FormContent, Content, Header } from './styles';
import {
  addRequest,
  updateRequest,
} from '~/store/modules/registration/actions';

const schema = Yup.object().shape({
  student: Yup.object()
    .shape({
      value: Yup.number().integer(),
    })
    .typeError('Aluno é obrigatório')
    .required('Aluno é obrigatório'),
  plan: Yup.object()
    .shape({
      value: Yup.number().integer(),
    })
    .typeError('Plano é obrigatório')
    .required('Plano é obrigatório'),
  start_date: Yup.date()
    .typeError('Data é obrigatória')
    .required('Data é obrigatória'),
});

export default function Registration() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.registration.loading);

  const btnSubmit = useRef();

  const [startDate, setStartDate] = useState(new Date());
  const [plans, setPlans] = useState({});
  const [plan, setPlan] = useState({});
  const [registration, setRegistration] = useState({});

  function submitForm() {
    btnSubmit.current.click();
  }

  async function handleSubmit(data) {
    const request = {
      student_id: data.student.value,
      plan_id: data.plan.value,
      start_date: data.start_date,
    };

    if (!id) dispatch(addRequest(request));
    else dispatch(updateRequest(request, id));

    setPlan({});
    setStartDate(null);
    setRegistration({});
  }

  function handleBack() {
    history.push('/registrations');
  }

  async function loadPlans() {
    const response = await api
      .get('plans', {
        params: { page: 1, limit: 100 },
      })
      .then(x => x.data)
      .then(y =>
        y.map(p => ({
          label: p.title,
          value: p.id,
          duration: p.duration,
          price: p.price,
        }))
      );

    setPlans(response);
  }

  async function loadStudents(inputValue) {
    const response = await api
      .get('students', {
        params: {
          q: `${inputValue}`,
          page: 1,
        },
      })
      .then(r => r.data)
      .then(r =>
        r.map(student => ({
          label: student.name,
          value: student.id,
        }))
      );
    return response;
  }

  const end_date = useMemo(() => {
    if (!plan.duration) {
      return '';
    }
    const { duration } = plan;
    const formattedDate = format(
      addMonths(startDate, duration),
      "dd'/'MM'/'yyyy",
      {
        locale: pt,
      }
    );
    return formattedDate;
  }, [plan, startDate]);

  const totalPrice = useMemo(() => {
    if (!plan.price) return '';

    return formatPrice(Number(plan.duration) * Number(plan.price));
  }, [plan.duration, plan.price]);

  useEffect(() => {
    loadPlans();
    if (id) {
      getRegistration();
    } else {
      setRegistration({
        end_date,
        totalPrice,
      });
    }
  }, [end_date, startDate, totalPrice]);

  async function getRegistration() {
    if (id) {
      const response = await api.get(`registrations`, {
        params: { id },
      });
      if (response.data) {
        const data = response.data[0];

        const formattedEndDate = format(parseISO(data.end_date), 'dd/MM/yyyy');

        setPlan(data.plan);
        const student = {
          label: data.student.name,
          value: data.student.id,
        };

        const planResult = {
          label: data.plan.title,
          value: data.plan.id,
          duration: data.plan.duration,
          price: data.plan.price,
        };

        setRegistration({
          id: data.id,
          start_date: parseISO(data.start_date),
          end_date: formattedEndDate,
          totalPrice: data.price,
          student,
          plan: planResult,
        });
      }
    }
  }

  return (
    <Container>
      <FormContent>
        <Header>
          <h2>{id ? 'Edição de Matrícula' : 'Cadastro de Matrícula'}</h2>
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
              <MdCheck size={20} color="#FFF" />{' '}
              <span> {loading ? 'Enviando...' : 'Salvar'}</span>
            </button>
          </div>
        </Header>
        <Form
          schema={schema}
          onSubmit={handleSubmit}
          initialData={registration}
        >
          <Content>
            <InputAsyncSelect
              name="student"
              loadOptions={loadStudents}
              label="ALUNO"
            />
            <div className="form">
              <label>
                <strong> PLANO</strong>
                <ReactSelect name="plan" options={plans} setChange={setPlan} />
              </label>
              <label>
                <strong>DATA DE INÍCIO</strong>
                <DatePicker name="start_date" setChange={setStartDate} />
              </label>
              <label>
                <strong> DATA DE TÉRMINO</strong>
                <Input
                  type="data"
                  name="end_date"
                  readOnly
                  className="readOnly"
                />
              </label>
              <label>
                <strong> VALOR FINAL</strong>
                <Input
                  type="text"
                  name="totalPrice"
                  readOnly
                  className="readOnly"
                />
              </label>
            </div>
          </Content>
          <button ref={btnSubmit} hidden type="submit">
            Send
          </button>
        </Form>
      </FormContent>
    </Container>
  );
}
