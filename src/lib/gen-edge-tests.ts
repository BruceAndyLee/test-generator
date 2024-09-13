import { type ParsedCell, parseTableRows, genGeneratorArgs, genGeneratorSignatures } from "./shared";

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
      // console.warn(`Unrecognized phase "${phaseCell}"`);
      return "";
    }

    const customGrouping = phaseCell.value in groupedColumns && groupedColumns[phaseCell.value].size > 0;

    const filteredCells = customGrouping
      ? argCells.filter((cell) => cell.value !== "" && groupedColumns[phaseCell.value].has(cell.key))
      : argCells.filter((cell) => cell.value !== "");

    // @ts-ignore
    generatorStrings[phaseCell.value] = phaseCodeMapping[phaseCell.value](genGeneratorArgs(filteredCells));
  }

  return `{
  title: "#${ind + 1}",
  setup: ${generatorStrings.setup},
  transition: ${generatorStrings.transition},
  elements: ${generatorStrings.elements}
}`;
}

// TODO: приделать разбиение колонок на setup/transition/ui
// TODO: приделать поддержку вложенности внутри каждой группы колонок, чтобы аргументы генераторов тоже были объектами с вложенностями
// TODO: научиться работать с таблицами, которые разбивают ячейки знаками "+"

// TODO: приделать интерполяцию, которая активируется только в том случае, если в каком-то из столбцов указано множественное название (типа схлопнутая краткая запись, чтобы не повторять один и тот же набор тестов для разных вариаций одного из аргументов)
// TODO: поддерживать subset-ы для колонок, чтобы указывать явно какие столцбы в какой генератор пробрасываются в качестве аргументов
// TODO: написать режим работы с typescript (вместо js-doc надо формировать определения типов)
// TODO: обработать случай, когда в генератор не падает ни одного аргумента (надо передавать строку "{}" без переносов)
// TODO: научиться обрабатывать массивы и объекты в качестве значений аргументов в ячейках
// TODO: использовать всё, что находится на 0й строчке перехода за таблицей в качестве заголовка теста
// TODO: генерить компонент с пропами по выбранным столбцам из таблицы
// TODO: приделать обработку дефолтных значений из строчки shared
// TODO: приделать определение типов аргументов

const returnTypes = {
  gen_edge_setup: "ComponentSetup",
  gen_transition: "FSMTransition",
  gen_ui_spec: "FSMElement[]"
}

const generatorBoilerplate = {
  gen_edge_setup: "",
  gen_transition: "return (wr) => {\n // transition implementation\n};",
  gen_ui_spec: `const normalized_config = {
  ...base_ui_config,
  ...config,
};
/** @type {FSMElement[]} */
const ui_spec = [];
// ui_spec generation
return ui_spec;
`
}
export function genEdgeSuite(markdownTable: string, groupedColumns: Record<string, Set<string>>): [string, string[]] {

  const [tableRowsParsed, headers] = parseTableRows(markdownTable);
  const tableRowsGroupedByEdge = groupByEdge(tableRowsParsed);

  const generatedTests = tableRowsGroupedByEdge.map(((testRows, ind) => stringifyTestRows(testRows, ind, groupedColumns)));

  const generator_signatures = genGeneratorSignatures<keyof typeof returnTypes>(["gen_edge_setup", "gen_transition", "gen_ui_spec"], headers, returnTypes, generatorBoilerplate);
  return [`${generator_signatures}\n\nconst testSuite = [\n${generatedTests.join(",\n")}\n];`.replaceAll("\t", "  "), headers];
}

// TODO подуматт: как автоматизировать генерацию внутренностей генераторов?
// -- для этого нужна некоторая точка входа, некоторый единый объект для кастомизации в каждом генераторе
// -- чтобы можно было в качестве аргументов генератора пробрасывать пути до значений внутри этого объекта и сами значения
// TODO подуматт: использовать вместо md-таблиц что-то более удобное? импортировать редактор таблиц типа excel?