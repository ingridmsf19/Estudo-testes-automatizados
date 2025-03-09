import { describe, it, expect } from "@jest/globals";
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
        name: "Joao",
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
        name: "Joao",
        cpf: "123.456.789-00",
      };
      expect(() => Person.validate(mockInvalidPerson)).not.toThrow();
    });
  });
});
