-- CreateTable
CREATE TABLE "dictionaries" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "word" TEXT NOT NULL,
    "reading" TEXT NOT NULL,

    CONSTRAINT "dictionaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nicknames" (
    "user_id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,

    CONSTRAINT "nicknames_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "user_id" TEXT NOT NULL,
    "voice_spaker_id" INTEGER NOT NULL DEFAULT 0,
    "voice_speed" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "voice_pitch" DOUBLE PRECISION NOT NULL DEFAULT 1.0,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE INDEX "dictionaries_user_id_idx" ON "dictionaries"("user_id");
