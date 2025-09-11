import email from "infra/email";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "Teste <teste@teste.com.br>",
      to: "StdOut <contato@stdout.deb.br>",
      subject: "Teste de Assunto",
      text: "Teste de Corpo",
    });

    await email.send({
      from: "Teste <teste@teste.com.br>",
      to: "StdOut <contato@stdout.deb.br>",
      subject: "Último email enviado",
      text: "Corpo do Último Email",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<teste@teste.com.br>");
    expect(lastEmail.recipients[0]).toBe("<contato@stdout.deb.br>");
    expect(lastEmail.subject).toBe("Último email enviado");
    expect(lastEmail.text).toBe("Corpo do Último Email\r\n");
  });
});
