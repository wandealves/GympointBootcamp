import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import Pagination from '~/components/Pagination';

import { Container, Header, Content, EmptyContent } from './styles';

export default function Plan() {
  const [plans, setPlans] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
  });

  useEffect(() => {
    loadPlans();
  }, [pagination]);

  async function handleDelete(id) {
    const result = window.confirm('Vocẽ tem certeza que deseja deletar?');

    if (result) {
      await api.delete(`/plans/${id}`);
      await loadPlans();
      toast.success('Plano removido');
    }
  }

  function handleNextPage() {
    const { page } = pagination;
    setPagination({
      ...pagination,
      page: page + 1,
    });
  }

  function handlePreviousPage() {
    const { page } = pagination;
    setPagination({
      ...pagination,
      page: page - 1,
    });
  }

  async function loadPlans() {
    const intlMonetary = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });

    const { page } = pagination;
    const response = await api.get('plans', {
      params: {
        page,
      },
    });

    const plansResult = response.data.map(data => {
      return {
        id: data.id,
        title: data.title,
        duration:
          data.duration > 1 ? `${data.duration} meses` : `${data.duration} mês`,
        price: intlMonetary.format(data.price),
      };
    });

    setPlans(plansResult);
  }

  return (
    <Container>
      <Header>
        <h2>Gerenciando Planos</h2>
        <div>
          <button type="button" onClick={() => history.push('/plan/create')}>
            <MdAdd size={20} color="#ffffff" style={{ marginRight: '5' }} />{' '}
            Cadastrar
          </button>
        </div>
      </Header>
      {plans.length ? (
        <Content>
          <table>
            <thead>
              <tr>
                <th align="left">TÍTULO</th>
                <th align="left">DURAÇÃO</th>
                <th align="center">VALOR p/ MÊS</th>
                <th className="th-none">Ações</th>
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>{plan.duration}</td>
                  <td align="center">{plan.price}</td>
                  <td className="actions">
                    <button
                      type="button"
                      title="Clique para editar o estudante"
                      className="btn btn-edit"
                      onClick={() => history.push(`/plan/${plan.id}/edit`)}
                    >
                      editar
                    </button>
                    <button
                      type="button"
                      title="Clique para remover o estudante"
                      className="btn btn-delete"
                      onClick={() => handleDelete(plan.id)}
                    >
                      apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Content>
      ) : (
        <EmptyContent>Nenhum plano encontrado</EmptyContent>
      )}
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        prevDisabled={pagination.page === 1}
        nextDisabled={plans.length === 0 || plans.length < pagination.limit}
      />
    </Container>
  );
}
