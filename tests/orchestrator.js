import retry from "async-retry";
import database from "infra/database.js";
import migrator from "models/migrator.js";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
      onRetry: (error, attempt) => {
        console.log(
          `Attempt ${attempt} failed to fetch status page: ${error.message}`,
        );
      },
    });

    async function fetchStatusPage() {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await fetch("http://localhost:3000/api/v1/status");
        if (response.status !== 200) {
          throw new Error(`Unexpected status code: ${response.status}`);
        }
      } catch (error) {
        throw error;
      }
    }
  }
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

async function runPendingMigrations() {
  const migratedMigrations = await migrator.runPendingMigrations();

  if (migratedMigrations.length > 0) {
    return migratedMigrations;
  }
  return [];
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
};
export default orchestrator;
