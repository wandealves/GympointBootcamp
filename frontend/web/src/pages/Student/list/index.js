import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import Pagination from '~/components/Pagination';

import { Container, Header, Content, EmptyContent } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
  });

  useEffect(() => {
    async function loadStudents() {
      const { page } = pagination;
      const response = await api.get('students', {
        params: {
          page,
        },
      });
      setStudents(response.data);
    }
    loadStudents();
  }, []);

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
        <h2>Gerenciando Alunos</h2>
        <div>
          <button type="button" onClick={() => history.push('/student/create')}>
            <MdAdd size={20} color="#ffffff" style={{ marginRight: '5' }} />{' '}
            Cadastrar
          </button>
          <div className="input-icons">
            <input
              className="input-field"
              type="text"
              placeholder="Buscar estudante"
            />
            <span className="inputWithIcon">
              <MdSearch
                size={20}
                color="#BEBEBE"
                style={{ marginRight: '5' }}
              />
            </span>
          </div>
        </div>
      </Header>
      {students.length ? (
        <Content>
          <table>
            <thead>
              <tr>
                <th align="left">Nome</th>
                <th align="left">E-mail</th>
                <th align="center">Idade</th>
                <th className="th-none">Ações</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td align="center">{student.age}</td>
                  <td className="actions">
                    <button
                      type="button"
                      title="Clique para editar o estudante"
                      className="btn btn-edit"
                      onClick={() =>
                        history.push(`/student/${student.id}/edit`)
                      }
                    >
                      editar
                    </button>
                    <button
                      type="button"
                      title="Clique para remover o estudante"
                      className="btn btn-delete"
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
          students.length === 0 || students.length < pagination.limit
        }
      />
    </Container>
  );
}
