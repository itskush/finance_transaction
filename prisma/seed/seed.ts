import { PrismaClient, Prisma } from "@prisma/client";
import { Category, Account, Transaction, CsvData } from "../../server/api/types";
import fs from "fs";
import Papa from 'papaparse';
const prisma = new PrismaClient();

export const stringToBoolean = (text: string) => {
  return text === "TRUE";
};

function getData(path: string) {
  const results: CsvData = [];
  const stream = fs.createReadStream(path);
  return new Promise<any>((resolve, reject) => {
    Papa.parse(stream, {
      header: true,
      worker: true,
      chunkSize: 1000,
      transformHeader: h => h.trim().replace(/"/g, ''),
      step: function (result: any) {
        results.push(result.data)
      },
      complete: function () {
        resolve(results);
      },
      error: function (error: any) {
        console.log(error)
        resolve(reject);
      }
    });
  });
}


async function executeInsertData(action: Function, path: string) {
  const data = await getData(path);
  await action(data);
}

async function insertCategory(value: Category) {
  return await prisma.categories.createMany({
    data: value
  });
}

async function insertAccount(value: Account) {
  return await prisma.account.createMany({
    data: value
  });
}

async function insertTransaction(value: Transaction) {
  return await prisma.transactions.createMany({
    data: value
  });
}

async function main() {
  try {

    //clear db to reset seed data
    await prisma.account.deleteMany()
    await prisma.categories.deleteMany()
    await prisma.transactions.deleteMany()
    console.log('Db reset done!\n')

    //add seed data
    await executeInsertData(insertCategory, "prisma/data/categories.csv");
    console.log('imported categories!\n')
    await executeInsertData(insertAccount, "prisma/data/accounts.csv");
    console.log('imported accounts!\n')
    await executeInsertData(insertTransaction, "prisma/data/transactions.csv");
    console.log('imported transactions!\n')

    console.log('Seeding done!')

  } catch (e) {
    console.error(e)
    process.exit(1)
  }

}

main().finally(() => {
  prisma.$disconnect();
});