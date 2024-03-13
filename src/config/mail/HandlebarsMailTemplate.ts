import handlebars from "handlebars";

interface ITemplateVariable{
  [key: string]: string | number;
}

interface IPaserMailTemplate{
  template: string;
  variables:  ITemplateVariable;
}

export default class HandlebarsMailTemplate{
  public async parse({ template, variables }:IPaserMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables)
  }
}
