class Person {
  static validate(person) {
    if (!person.name) throw new Error("name is required");
    if (!person.cpf) throw new Error("cpf is required");
  }

  static process(person) {
    this.validate(person);
    return "ok";
  }
}
Person.process({
  name: "John",
  cpf: "123.456.789-00",
});

export default Person;
