import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import Pagination from '~/components/Pagination';
import Modal from '~/components/Modal';
import { Container, Header, Content, EmptyContent } from './styles';

export default function HelpOrder() {
  const [helps, setHelps] = useState([]);
  const [modalData, setModalData] = useState({
    status: false,
    loading: false,
    values: {},
  });
  const [pagination, setPagination] = useState({
    page: 1,
  });

  useEffect(() => {
    loadHelps();
  }, [pagination]);

  async function loadHelps() {
    const { page } = pagination;
    const response = await api.get('help-orders/no-reply', {
      params: {
        page,
      },
    });

    setHelps(response.data);
  }

  async function handleSubmitAnswer(data) {
    setModalData({ ...modalData, loading: true });
    try {
      data.answer_at = new Date();
      await api.post(`help-orders/${data.id}/answer`, data);
      toast.success('Resposta enviada com sucesso');
      loadHelps();
    } catch (err) {
      toast.error(err.response.data.error);
    }
    setModalData({ ...modalData, status: false, loading: false });
  }

  function handleCloseModal() {
    setModalData({ ...modalData, status: false });
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

  return (
    <Container>
      <Modal
        data={modalData}
        onHandleSubmit={handleSubmitAnswer}
        onClose={handleCloseModal}
      />
      <Header>
        <h2>Pedidos de Auxílio</h2>
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
                      title="Clique para responder o estudante"
                      className="btn btn-edit"
                      onClick={() =>
                        setModalData({ status: true, values: { ...help } })
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
        <EmptyContent>Nenhum pedido encontrado</EmptyContent>
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
