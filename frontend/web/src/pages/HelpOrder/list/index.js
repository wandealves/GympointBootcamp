import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import Pagination from '~/components/Pagination';

import { Container, Header, Content, EmptyContent } from './styles';

export default function HelpOrder() {
  const [helps, setHelps] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
  });

  useEffect(() => {
    async function loadHelps() {
      const { page } = pagination;
      const response = await api.get('help-orders/no-reply', {
        params: {
          page,
        },
      });

      setHelps(response.data);
    }
    loadHelps();
  }, [pagination]);

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

  return (
    <Container>
      <Header>
        <h2>Pedidos de Auxílio</h2>
        <div>
          <button
            type="button"
            onClick={() => history.push('/registrations/create')}
          >
            <MdAdd size={20} color="#ffffff" style={{ marginRight: '5' }} />{' '}
            Cadastrar
          </button>
        </div>
      </Header>
      {helps.length ? (
        <Content>
          <table>
            <thead>
              <tr>
                <th align="left">ALUNO</th>
                <th className="th-none">Ações</th>
              </tr>
            </thead>
            <tbody>
              {helps.map(help => (
                <tr key={help.id}>
                  <td>{help.student.name}</td>
                  <td className="actions">
                    <button
                      type="button"
                      title="Clique para editar o estudante"
                      className="btn btn-edit"
                      onClick={() =>
                        history.push(`/registrations/${help.id}/edit`)
                      }
                    >
                      responder
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
        nextDisabled={helps.length === 0 || helps.length < pagination.limit}
      />
    </Container>
  );
}
