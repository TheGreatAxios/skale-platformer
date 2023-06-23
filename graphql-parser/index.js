const axios = require('axios');
const csv = require('csv-parser');
const fs = require('fs');

const endpoint = 'https://squid.subsquid.io/skale-platformer/v/v1/graphql';

const query = `
  query MyQuery {
    transactions(where: {blockNumber_gt: 2147500}) {
      input
    }
  }
`;

axios.post(endpoint, { query })
  .then(response => {
    const transactions = response.data.data.transactions;
    const addresses = transactions.map(transaction => "0x" + transaction.input.substring(transaction.input.length - 40));
    const filteredAddresses = [...new Set(addresses)];


    const csvData = filteredAddresses.join('\n');

    fs.writeFile('addresses.csv', csvData, err => {
      if (err) {
        console.error('Failed to write CSV file:', err);
      } else {
        console.log('CSV file created successfully!');
      }
    });
  })
  .catch(error => {
    console.error('GraphQL query failed:', error);
  });

