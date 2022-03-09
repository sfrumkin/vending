import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';
import validator from '@middy/validator';
import addItemSchema from '../lib/schemas/addItemSchema';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function addItem(event, context) {

  const {item_name, price, item_type, description} = event.body;

  const item = {
    pk: 'ITEM_'+ item_name,
    sk: 'PRICE_'+price,
    data1: 'TYPE_'+item_type,
    data2: 'DESC_'+description,
  };
 
  try{
    await dynamodb.put({
      TableName: process.env.VENDING_TABLE_NAME,
      Item: item,
    }).promise();
  } catch(error){
    console.error(error);
    throw new createError.InternalServerError(error);
  } 
  return {
    statusCode: 201,
    body: JSON.stringify(item),
  };
}

export const handler = commonMiddleware(addItem).use(
  validator({
    inputSchema: addItemSchema,
    ajvOptions: {
      strict: false,
    },
  })
);

