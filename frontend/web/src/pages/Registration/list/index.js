import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { MdAdd, MdCheckCircle } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';
import Pagination from '~/components/Pagination';
import { Container, Header, Content, EmptyContent } from './styles';

export default function Registration() {
  const [registrations, setRegistrations] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
  });

  useEffect(() => {
    loadRegistrations();
  }, [pagination]);

  async function loadRegistrations() {
    const { page } = pagination;
    const response = await api.get('registrations', {
      params: {
        page,
      },
    });

    setRegistrations(response.data);
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

  async function handleDelete(id) {
    /* eslint-disable */
    const result = window.confirm('Vocẽ tem certeza que deseja deletar?');
    /* eslint-disable */

    if (result) {
      await api.delete(`/registrations/${id}`);
      await loadRegistrations();
      toast.success('Matrícula removido');
    }
  }

  return (
    <Container>
      <Header>
        <h2>Gerenciando Planos</h2>
        <div>
          <button
            type="button"
            onClick={() => history.push('/registration/create')}
          >
            <MdAdd size={20} color="#ffffff" style={{ marginRight: '5' }} />{' '}
            Cadastrar
          </button>
        </div>
      </Header>
      {registrations.length ? (
        <Content>
          <table>
            <thead>
              <tr>
                <th align="left">ALUNO</th>
                <th align="left">PLANO</th>
                <th align="left">INÍCIO</th>
                <th align="left">TÉRMINO</th>
                <th align="center">ATIVA</th>
                <th className="th-none">Ações</th>
                <th className="th-none">Ações</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map(registration => (
                <tr key={registration.id}>
                  <td>{registration.student.name}</td>
                  <td>{registration.plan.title}</td>
                  <td>
                    {format(
                      parseISO(registration.start_date),
                      "dd 'de' MMMM 'de' yyyy",
                      { locale: ptBR }
                    )}
                  </td>
                  <td>
                    {format(
                      parseISO(registration.end_date),
                      "dd 'de' MMMM 'de' yyyy",
                      { locale: ptBR }
                    )}
                  </td>
                  <td align="center">
                    {registration.active ? (
                      <MdCheckCircle size={20} color="#00b894" />
                    ) : (
                      <MdCheckCircle size={20} color="#dddddd" />
                    )}
                  </td>
                  <td className="actions">
                    <button
                      type="button"
                      title="Clique para editar o estudante"
                      className="btn btn-edit"
                      onClick={() =>
                        history.push(`/registration/${registration.id}/edit`)
                      }
                    >
                      editar
                    </button>
                  </td>
                  <td className="actions">
                    <button
                      type="button"
                      title="Clique para remover a matrícula"
                      className="btn btn-delete"
                      onClick={() => handleDelete(registration.id)}
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
        <EmptyContent>Nenhum aluno encontrado</EmptyContent>
      )}
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        prevDisabled={pagination.page === 1}
        nextDisabled={
          registrations.length === 0 || registrations.length < pagination.limit
        }
      />
    </Container>
  );
}
