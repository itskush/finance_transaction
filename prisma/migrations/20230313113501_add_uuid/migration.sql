-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bank" TEXT NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "accountId" TEXT,
    "categoryId" TEXT,
    "reference" TEXT NOT NULL DEFAULT 'No reference',
    "date" TEXT,
    "amount" TEXT,
    "currency" TEXT,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);
