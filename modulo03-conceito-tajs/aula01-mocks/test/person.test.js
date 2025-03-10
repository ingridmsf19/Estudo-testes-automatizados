import { describe, it, expect, jest } from "@jest/globals";
import Person from "../src/person";

describe("Person Suite", () => {
  describe("#validate", () => {
    it("should throw an error when there is no name", () => {
      //mock é a entrada necessária para que o teste funcione
      const mockInvalidPerson = {
        name: "",
        cpf: "123.456.789-00",
      };
      //espera que o método validate lance uma exceção
      expect(() => Person.validate(mockInvalidPerson)).toThrowError(
        "name is required"
      );
    });

    it("should throw an error when there is no cpf", () => {
      //mock é a entrada necessária para que o teste funcione
      const mockInvalidPerson = {
        name: "Maria",
        cpf: "",
      };
      //espera que o método validate lance uma exceção
      expect(() => Person.validate(mockInvalidPerson)).toThrowError(
        "cpf is required"
      );
    });

    it("should not throw an error when there is a valid person", () => {
      //mock é a entrada necessária para que o teste funcione
      const mockInvalidPerson = {
        name: "Maria",
        cpf: "123.456.789-00",
      };
      expect(() => Person.validate(mockInvalidPerson)).not.toThrow();
    });
  });

  describe("#format", () => {
    // parte do principio que os dados ja foram validados
    it("should format the person name and CPF", () => {
      //AAA

      // Arrange = Preparar
      const mockPerson = {
        name: "Maria da Silva",
        cpf: "000.111.123-56",
      };
      // Act = Executar
      const formattedPerson = Person.format(mockPerson);

      // Assert = Validar
      const expected = {
        name: "Maria",
        cpf: "000.111.123-56",
        lastName: "da Silva",
      };

      expect(formattedPerson).toStrictEqual(expected);
    });
  });

  describe("#save", () => {
    it("should throw an error when there is a invalid person", () => {
      const mockInvalidPerson = {
        name: "Maria",
        cpf: "123.456.789-00",
        lastName: "",
      };

      expect(() => Person.save(mockInvalidPerson)).toThrowError(
        `cannot save invalid person: ${JSON.stringify(mockInvalidPerson)}`
      );
    });

    it("should save a valid person", () => {
      const mockValidPerson = {
        name: "Maria",
        cpf: "12345678900",
        lastName: "da Silva",
      };

      expect(() => Person.save(mockValidPerson)).not.toThrow();
    });
  });

  describe("#process", () => {
    it("should process a valid person", () => {
      // uma outra ideia é não retestar o que já foi testado

      // lembra dos checkpoints?
      // Testou do caminho A ao caminho B, agora testa do caminho B ao caminho C
      // Então aqui, eu pulo o caminho A (validate), caminho B (format) e vou direto
      // para o caminho C (save) pois estes caminhos já foram validados

      //Este método abaixo faz mais sentido para quando se tem interações externas, como:
      // chamadas de API, banco de dados, etc...

      //AAA Arrange, Act, Assert

      // Arrange
      const mockPerson = {
        name: "Joao da Silva",
        cpf: "123.987.456-00",
      };

      jest.spyOn(Person, Person.validate.name).mockReturnValue();
      // Para ver como a função process se comporta com um erro
      // .mockImplementation(() => {
      //   throw new Error('Deu ruim!!')
      // })
      jest.spyOn(Person, Person.format.name).mockReturnValue({
        name: "Joao da Silva",
        cpf: "12398745600",
        lastName: "da Silva",
      });

      // Act
      const result = Person.process(mockPerson);

      //Assert
      const expected = "ok";
      expect(result).toStrictEqual(expected);
    });
  });
});
