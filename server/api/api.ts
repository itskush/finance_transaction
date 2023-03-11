import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server'

const prisma = new PrismaClient();

const typeDefs = `
    type Mutation {
        changeTransactionCategory(id: String!): Transaction
        addCategory(data: CategoryInput!): Category!
    }

    input CategoryInput {
        id: String
        name: String
        color: String!
    }

    type Category {
        id: String
        name: String!
        color: String
        transactions: [Transaction!]!
    }

    type Account {
        id: String
        name: String
        bank: String
        transactions: [Transaction!]!
    }

    type Transaction {
        id: String
        accountId: String
        categoryId: String
        date: String
        amount: String
        currency: String
        reference: String
        category: Category
        account: Account
    }

    type Query {
        allCategories: [Category!]!
        allAccounts: [Account!]!
        getTransactions(offset: Int, limit: Int): [Transaction!]!
        singleTransaction(id: String): Transaction
    }
`;

const resolvers = {
    Query: {
        allCategories: () => {
            return prisma.categories.findMany();
        },
        getTransactions: (parent : any, args : {offset : number, limit: number}) => {
            return  prisma.transactions.findMany({
                skip:  args.offset,
                take: args.limit,
                include: {
                    category: true,
                    account: true,
                },
            });
        },
        allAccounts: () => {
            return prisma.account.findMany();
        },
        singleTransaction: (parent : any, args : {id : string}) => {
            return prisma.transactions.findUnique({
                where: { id: args.id || undefined },
                include: {
                    category: true,
                    account: true,
                },
            })
         
        },
    },
    Mutation: {
        addCategory: (_parent : any, args : { data : CategoryInput }) => {
          return prisma.categories.create({
            data: {
              name: args.data.name,
              id: args.data.id,
              color: args.data.color,
            },
          })
        },
        changeTransactionCategory: (_parent : any, args : { data : CategoryInput }) => {
            return prisma.categories.create({
              data: {
                name: args.data.name,
                id: args.data.id,
                color: args.data.color,
              },
            })
          },
    }
};

interface CategoryInput {
    id: string
    name: string
    color?: string
}

const server = new ApolloServer({ resolvers, typeDefs });
server.listen({ port: 4000 });