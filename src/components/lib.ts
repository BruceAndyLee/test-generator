type ParsedCell = {
  key: string,
  value: string,
}

function parseTableRows(markdownTable: string): [ParsedCell[][], string[]] {
  const rows = markdownTable.trim().split("\n");
  const res = [];
  const headers_raw = rows[0].trim().split("|");
  const headers = headers_raw.slice(1, headers_raw.length - 1).map(cell => cell.trim());

  for (const row of rows.slice(1)) {
    // Clean up the row and split by the pipe symbol to get individual cells
    const raw_cells = row.trim().split("|");
    const cells = raw_cells
      .slice(1, raw_cells.length - 1)
      .map((cell, ind) => ({ key: headers[ind], value: cell.trim() }));

    if (cells.length === 0 || cells[0].value.split("").every(char => char === '-' || char === '=')) {
      continue;
    } else {
      res.push(cells);
    }
  }
  return [res, headers];
}

function groupByEdge(tableRowsParsed: ParsedCell[][]): ParsedCell[][][] {
  const groupedTests = [];
  let curTest = [];
  for (const row of tableRowsParsed) {
    if (curTest.length === 3) {
      groupedTests.push(curTest);
      curTest = [];
    }
    curTest.push(row);
  }
  return groupedTests;
}

function genArgCode(cell: ParsedCell): string {
  if (cell.value === "null") {
    return `\t\t${cell.key}: null`;
  }
  if (cell.value === "false") {
    return `\t\t${cell.key}: false`;
  }
  if (cell.value === "true") {
    return `\t\t${cell.key}: true`;
  }
  const asFloat = Number.parseFloat(cell.value);
  const typeAwareStringified = Number.isNaN(asFloat) ? `"${cell.value}"` : asFloat
  return `\t\t${cell.key}: ${typeAwareStringified}`;
}

const genGeneratorArgs = (argCells: ParsedCell[]) => {
  if (argCells.length === 0) {
    return "";
  }
  return `\n${argCells
    .map(genArgCode)
    .join(",\n")}\n\t`;
};

const phaseCodeMapping = {
  setup: (argsString: string) => `gen_edge_setup({${argsString}})`,
  transition: (argsString: string) => `gen_transition({${argsString}})`,
  elements: (argsString: string) => `gen_ui_spec({${argsString}})`,
}

function stringifyTestRows(testPhases: ParsedCell[][], ind: number, groupedColumns: Record<string, Set<string>> = {}): string {
  const generatorStrings = {
    setup: "",
    transition: "",
    elements: "",
  };

  for (const phaseRow of testPhases) {
    const [phaseCell, ...argCells] = phaseRow;

    if (!(phaseCell.value in phaseCodeMapping)) {
      console.error(`Unrecognized phase "${phaseCell}"`);
      return "";
    }

    const customGrouping = phaseCell.value in groupedColumns && groupedColumns[phaseCell.value].size > 0;

    const filteredCells = customGrouping
      ? argCells.filter((cell) => cell.value !== "" && groupedColumns[phaseCell.value].has(cell.key))
      : argCells.filter((cell) => cell.value !== "");

    generatorStrings[phaseCell.value] = phaseCodeMapping[phaseCell.value](genGeneratorArgs(filteredCells));

    console.log("stringifyTestRows: phaseCell.value", phaseCell.value);
    console.log("stringifyTestRows: groupedColumns", groupedColumns);
    console.log("stringifyTestRows: filteredCells", filteredCells);
  }

  return `{
  title: "#${ind + 1}",
  setup: ${generatorStrings.setup},
  transition: ${generatorStrings.transition},
  elements: ${generatorStrings.elements}
}`;
}

const returnTypes = {
  gen_edge_setup: "ComponentSetup",
  gen_transition: "FSMTransition",
  gen_edge_ui_spec: "FSMElement[]"
}

const generatorBoilerplate = {
  gen_edge_setup: "",
  gen_transition: "return (wr) => {\n // transition implementation\n};",
  gen_edge_ui_spec: `const normalized_config = {
  ...base_ui_config,
  ...config,
};
/** @type {FSMElement[]} */
const ui_spec = [];
// ui_spec generation
return ui_spec;
`
}

function generateJSDoc(generator_name: "gen_edge_setup" | "gen_transition" | "gen_edge_ui_spec", paramNames: string[]) {
  const paramLines = paramNames.map(param => ` *  ${param}?: any;`).join('\n');
  return `/**\n * Generated function\n * @param {{\n${paramLines}\n * }} config\n * @returns {${returnTypes[generator_name]}}\n */`;
}

function generateFunction(generator_name: "gen_edge_setup" | "gen_transition" | "gen_edge_ui_spec", paramNames: string[]) {
  return `${generateJSDoc(generator_name, paramNames)}\nexport const ${generator_name}(config) => {\n${generatorBoilerplate[generator_name]}\n}`;
}

function genGeneratorSignatures(paramNames: string[]): string {

  // Generate the three function signatures
  const setupFunction = generateFunction('gen_edge_setup', paramNames);
  const transitionFunction = generateFunction('gen_transition', paramNames);
  const uiSpecFunction = generateFunction('gen_edge_ui_spec', paramNames);

  return `${setupFunction}\n\n${transitionFunction}\n\n${uiSpecFunction}`;
}

// // TODO: приделать генерацию сигнатур генераторов для теста
// // TODO: приделать генерацию js-doc для этих генераторов
// TODO: поддерживать subset-ы для колонок, чтобы указывать явно какие столцы в какой генератор пробрасываются в качестве аргументов
// TODO: написать режим работы с typescript (вместо js-doc надо формировать определения типов)
// TODO: заголовки в таблице могут содержать пробелы, надо заменять их на подчеркивания
// TODO: обработать случай, когда в генератор не падает ни одного аргумента (надо передавать строку "{}" без переносов)
// TODO: приделать мапперы для названий столбцов (типа как в случае ω -> mass_fraction)
// TODO: резолверы, чтобы можно было раскрывать лаконичную декларацию параметров в более длинные значения при вызове генераторов
// TODO: научиться обрабатывать массивы и объекты в качестве значений аргументов в ячейках
// ! TODO: приделать разбиение колонок на setup/transition/ui
// ! TODO: поддержка произвольного количества transition в одном тесте
// TODO: использовать всё, что находится на 0й строчке перехода за таблицей в качестве заголовка теста 
// TODO: генерить компонент с пропами по выбранным столбцам из таблицы
// TODO: приделать поддержку вложенности внутри каждой группы колонок? чтобы аргументы генераторов тоже были объектами с вложенностями?
// TODO: приделать обработку дефолтных значений из строчки shared
// TODO: приделать определение типов аргументов
export function genEdgeSuite(markdownTable: string, groupedColumns: Record<string, Set<string>>): string {

  const [tableRowsParsed, headers] = parseTableRows(markdownTable);
  const tableRowsGroupedByEdge = groupByEdge(tableRowsParsed);

  const generatedTests = tableRowsGroupedByEdge.map(((testRows, ind) => stringifyTestRows(testRows, ind, groupedColumns)));

  const generator_signatures = genGeneratorSignatures(headers);
  return `${generator_signatures}\n\nconst testSuite = [\n${generatedTests.join(",\n")}\n];`.replaceAll("\t", "  ");
}

// TODO подуматт: как автоматизировать генерацию внутренностей генераторов?
// -- для этого нужна некоторая точка входа, некоторый единый объект для кастомизации в каждом генераторе
// -- чтобы можно было в качестве аргументов генератора пробрасывать пути до значений внутри этого объекта и сами значения
// TODO подуматт: использовать вместо md-таблиц что-то более удобное? импортировать редактор таблиц типа excel?