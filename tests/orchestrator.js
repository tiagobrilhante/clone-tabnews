import retry from "async-retry";

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
const orchestrator = {
  waitForAllServices,
};
export default orchestrator;
