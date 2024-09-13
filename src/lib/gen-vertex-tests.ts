import { genGeneratorArgs, genGeneratorSignatures, parseTableRows, type ParsedCell } from "./shared";

const genVertexTestCaseCode = (row: ParsedCell[], ind: number, headers: string[], groupedColumnSets: Record<"setup" | "elements", Set<string>>) => {
  const setupCells = groupedColumnSets.setup.size > 0
    ? row.filter((cell) => groupedColumnSets.setup.has(cell.key))
    : row;
  const setupArgs = genGeneratorArgs(setupCells);

  const uiSpecCells = groupedColumnSets.elements.size > 0
    ? row.filter((cell) => groupedColumnSets.elements.has(cell.key))
    : row;
  const uiSpecArgs = genGeneratorArgs(uiSpecCells);

  return `{
  title: "#${ind}",
  setup: gen_setup({${setupArgs}}),
  elements: gen_ui_spec({${uiSpecArgs}}),
}`;
}

const generatorBoilerplate = {
  gen_setup: "",
  gen_ui_spec: "",
}

const returnTypes = {
  gen_setup: "ComponentSetup",
  gen_ui_spec: "FSMElements[]",
}

export function genVertexSuite(markdownTable: string, groupedColumnSets: Record<"setup" | "elements", Set<string>>): [string, string[]] {

  const [tableRowsParsed, headers] = parseTableRows(markdownTable);

  // Process each row and convert it into a JS code string
  const testCasesCode = tableRowsParsed.map((tableRow, ind) => genVertexTestCaseCode(tableRow, ind, headers, groupedColumnSets));

  const generatorSignatures = genGeneratorSignatures<"gen_setup" | "gen_ui_spec">(["gen_setup", "gen_ui_spec"], headers, returnTypes, generatorBoilerplate);
  // Combine all test cases into a single JS array declaration
  return [`${generatorSignatures}\n\nconst test_cases = [
${testCasesCode.join(',\n')}
];`.replaceAll("\t", "  "), headers];
}
