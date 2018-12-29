import React from 'react';
import { shallow } from 'enzyme';
import DataTable from './DataTable';

it ('renders in table rows based on provided columns', () => {
  const cols = [
    { header: 'ID', name: 'id' },
    { header: 'Name', name: 'name' },
    { header: 'Email', name: 'email' }
  ];

  const data = [
    { id: "5", name: 'John', email: 'john@example.com' },
    { id: "6", name: 'Liam', email: 'liam@example.com' },
    { id: "7", name: 'Maya', email: 'maya@example.com', someTest: 10 },
    { id: "8", name: 'Oliver', email: 'oliver@example.com', hello: 'hello world' },
    { id: "25", name: 'Amelia', email: 'amelia@example.com' }
  ];

  const container = shallow(<DataTable rows={data} cols={cols} />);

  const table = container.find('table');
  expect(table).toHaveLength(1);

  const thead = table.find('thead');
  expect(thead).toHaveLength(1);

  const header = thead.find('th');
  expect(header).toHaveLength(cols.length);

  header.forEach((th, idx) => {
    expect(th.text()).toEqual(cols[idx].header);
  });

  const tbody = table.find('tbody');
  expect(tbody).toHaveLength(1);

  const rows = tbody.find('tr');
  expect(rows).toHaveLength(data.length);

  rows.forEach((tr, rowIndex) => {
    const cells = tr.find('td');
    expect(cells).toHaveLength(cols.length);
    expect(cells.at(0).text()).toEqual(data[rowIndex].id);
    expect(cells.at(1).text()).toEqual(data[rowIndex].name);
    expect(cells.at(2).text()).toEqual(data[rowIndex].email);
  })
})

it('renders empty message as table cell if there is no data', () => {
  const cols = [
    { header: 'ID', name: 'id' },
    { header: 'Name', name: 'name' },
    { header: 'Email', name: 'email' }
  ];

  const container = shallow(<DataTable rows={[]} cols={cols} />);

  const table = container.find('table');
  expect(table).toHaveLength(1);

  const thead = table.find('thead');
  expect(thead).toHaveLength(1);

  const header = thead.find('th');
  expect(header).toHaveLength(cols.length);

  const tbody = table.find('tbody');
  expect(tbody).toHaveLength(1);

  header.forEach((th, idx) => {
    expect(th.text()).toEqual(cols[idx].header);
  });

  const row = tbody.find('tr');
  expect(row).toHaveLength(1);

  const cell = row.find('td');
  expect(cell).toHaveLength(1);

  expect(cell.prop('colSpan')).toEqual(cols.length);

  expect(cell.text()).toEqual('There is no data in this table');
})