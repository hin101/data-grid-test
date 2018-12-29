import React from 'react';

const renderData = (data, cols) =>
  data.map(row =>
    <tr key={row.id}>
        {cols.map(col =>
            <td key={col.name}>{row[col.name]}</td>
        )}
    </tr>
  );

const renderEmptyState = cols =>
  <tr>
    <td colSpan={cols.length}>There is no data in this table</td>
  </tr>
;

const DataTable = props => {
  return (
    <table>
      <thead>
        <tr>
          {props.cols.map(col =>
            <th key={col.name}>{col.header}</th>
          )}
        </tr>
      </thead>
      <tbody>
          {props.rows.length > 0 ? renderData(props.rows, props.cols) : renderEmptyState(props.cols)}
      </tbody>
    </table>
  );
}

export default DataTable;