import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function addItemToVend(event, context) {

  const {item_name, vending_id, quantity, price} = event.body;

  const item = {
    pk: 'VEND_'+ vending_id,
    sk: 'ITEM_'+item_name,
    data1: 'QUANT_'+quantity,
    data2: 'PRICE_'+price,
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

export const handler = commonMiddleware(addItemToVend);

