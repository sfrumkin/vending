import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function addVending(event, context) {

  const {vending_id, address} = event.body;

  const vend = {
    pk: 'VEND_'+ vending_id,
    sk: 'VEND_'+ vending_id,
    data1: 'VADD_'+address,
    
  };
 
  try{
    await dynamodb.put({
      TableName: process.env.VENDING_TABLE_NAME,
      Item: vend,
    }).promise();
  } catch(error){
    console.error(error);
    throw new createError.InternalServerError(error);
  } 
  return {
    statusCode: 201,
    body: JSON.stringify(vend),
  };
}

export const handler = commonMiddleware(addVending);

