import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { parseISO, addMonths } from 'date-fns';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import history from '~/services/history';
import api from '~/services/api';

import {
  Container,
  Header,
  Content,
  ContentRow,
  StudentPicker,
  PlanPicker,
} from './styles';

const schema = Yup.object().shape({
  student: Yup.mixed().required('OP2'),
  plan: Yup.mixed().required('OP2'),
  start_date: Yup.date()
    .typeError('OP')
    .required('OP2'),
});

export default function RegistrationForm() {
  const [registration, setRegistration] = useState({});
  const [plans, setPlans] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function pageLoad() {
      if (!isNewRegistration()) {
        const fetchPlansPromise = fetchPlans();
        const fetchRegistrationPromise = fetchRegistration();

        const plansData = (await fetchPlansPromise).data;
        const registrationData = (await fetchRegistrationPromise).data;

        setPlans(plansData);

        setRegistration({
          ...registrationData,
          start_date: parseISO(registrationData.start_date),
          end_date: parseISO(registrationData.end_date),
        });
      } else {
        const { data } = await fetchPlans();
        setPlans(data);
      }
    }

    pageLoad();
  }, []); //eslint-disable-line

  function fetchStudents() {
    return api.get('students', {
      params: {
        page: 1,
        q: null,
      },
    });
  }

  function fetchPlans() {
    return api.get('plans');
  }

  function fetchRegistration() {
    return api.get('registrations', {
      params: { id },
    });
  }

  function isNewRegistration() {
    return !id;
  }

  async function handleFormSubmit(data) {
    try {
      if (isNewRegistration()) {
        await insertRegistration(data);
      } else {
        await updateRegistration(data);
      }
      history.push('/registrations');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  function fixHttpData(data) {
    data = {
      ...data,
      student_id: data.student.id,
      plan_id: data.plan.id,
      date: data.start_date,
    };
    delete data.student;
    delete data.plan;
    delete data.start_date;
    delete data.price;
    delete data.end_date;

    return data;
  }

  async function insertRegistration(data) {
    data = fixHttpData(data);

    await api.post('registrations', data);
    toast.success('Cadastro realizado');
  }

  async function updateRegistration(data) {
    data = fixHttpData(data);

    await api.put(`registrations/${registration.id}`, data);
    toast.success('Cadastro alterado');
  }

  const filterColors = (data, inputValue) => {
    return data.filter(i =>
      i.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadStudentOptions = async inputValue => {
    async function loadStudents() {
      const { data } = await fetchStudents();
      return data;
    }
    const data = await loadStudents();

    return new Promise(resolve => {
      resolve(filterColors(data, inputValue));
    });
  };

  function handleStartDateChange(newDate) {
    setRegistration({
      ...registration,
      start_date: newDate,
      end_date: addMonths(newDate, registration.plan.duration),
    });
  }

  function handlePlanChange(newPlan) {
    setRegistration({
      ...registration,
      plan: newPlan,
      end_date: registration.start_date
        ? addMonths(registration.start_date, newPlan.duration)
        : null,
      price: newPlan.price * newPlan.duration,
    });
  }

  function handleBack(){}

  function submitForm(){}

  function handleSubmit(){}

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
            Salvar'
          </button>
        </div>
      </Header>

<Content>
      <Form schema={schema} initialData={registration} onSubmit={handleSubmit}>
        <label>ALUNO</label>
        <StudentPicker name="student" loadOptions={loadStudentOptions} />

        <ContentRow>
          <div>
            <label>PLANO</label>
            <PlanPicker
              name="plan"
              options={plans}
              onChange={handlePlanChange}
            />
          </div>
          <div>
            <Input
              className="normal-input"
              name="start_date"
              label="DATA DE INÍCIO"
            />
          </div>
          <div>
            <Input className="normal-input"
            name="end_date"
            label="DATA DE TÉRMINO"
             disabled />
          </div>
          <div>
            <Input
              className="normal-input"
              name="price"
              prefix="R$ "
              label="PRECO TOTAL"
              disabled
            />
          </div>
        </ContentRow>
      </Form>
      </Content>
    </Container>
  );
}

RegistrationForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
