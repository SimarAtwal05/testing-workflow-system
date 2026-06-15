-- CreateEnum
CREATE TYPE "TestType" AS ENUM ('NDT', 'DT');

-- CreateTable
CREATE TABLE "TestingRequest" (
    "id" SERIAL NOT NULL,
    "testType" "TestType" NOT NULL,
    "temperature" DOUBLE PRECISION,
    "status" "RequestStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER NOT NULL,
    "assignedEngineerId" INTEGER,

    CONSTRAINT "TestingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestingResult" (
    "id" SERIAL NOT NULL,
    "observations" TEXT NOT NULL,
    "conclusion" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requestId" INTEGER NOT NULL,

    CONSTRAINT "TestingResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestingResult_requestId_key" ON "TestingResult"("requestId");

-- AddForeignKey
ALTER TABLE "TestingRequest" ADD CONSTRAINT "TestingRequest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestingRequest" ADD CONSTRAINT "TestingRequest_assignedEngineerId_fkey" FOREIGN KEY ("assignedEngineerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestingResult" ADD CONSTRAINT "TestingResult_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "TestingRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
