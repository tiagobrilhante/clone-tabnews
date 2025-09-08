import email from "infra/email";

describe("infra/email.js", () => {
  test("send()", async () => {
    await email.send({
      from: "Teste <teste@teste.com.br>",
      to: "StdOut <contato@stdout.deb.br>",
      subject: "Teste de Assunto",
      text: "Teste de Corpo",
    });
  });
});
