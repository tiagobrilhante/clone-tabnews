import bcryptjs from "bcryptjs";

/*
async function hash(password) {
  const salt = await bcryptjs.genSalt(14);
  return await bcryptjs.hash(password, salt);
}*/

async function hash(password) {
  const rounds = getNumberOfRounds();
  return await bcryptjs.hash(password, rounds);
}

function getNumberOfRounds() {
  let rounds = 0;
  if (process.env.NODE_ENV === "production") {
    rounds = 14;
  }

  return rounds;
}

async function compare(providedPassword, storedPassword) {
  return await bcryptjs.compare(providedPassword, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
