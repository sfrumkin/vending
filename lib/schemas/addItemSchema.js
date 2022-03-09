const schema = {
  type: 'object', 
  properties: {
    body: {
      type: 'object', 
      properties: {
        item_name: {
          type: 'string',
        },
        price: {
          type: 'string',
        },
        item_type: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
      },
      required: ['item_name'],
      required: ['price'],
      required: ['item_type'],
    },
  },
  required: [
    'body',
  ],
};

export default schema;