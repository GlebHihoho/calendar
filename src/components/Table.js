import React from 'react';
import content from '../content/data';

function Table(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Фамилия Имя Отчество</th>
          <th>Должность</th>
          <th>Дата начала</th>
          <th>Дата окончания</th>
        </tr>
      </thead>

      <tbody>
        {content.map(el => {
          return (
            <tr>
              <td>{el.name}</td>
              <td>{el.position}</td>
              <td>{el.start}</td>
              <td>{el.finish}</td>
            </tr>
          )
        })}

      </tbody>
    </table>
  )
}

export default Table;
