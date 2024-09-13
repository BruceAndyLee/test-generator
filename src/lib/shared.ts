export type ParsedCell = {
  key: string,
  value: string,
}

export function parseTableRows(markdownTable: string): [ParsedCell[][], string[]] {
  const rows = markdownTable.trim().split("\n");
  const res = [];
  const headers_raw = rows[0].trim().split("|");
  const headers = headers_raw
    .slice(1, headers_raw.length - 1)
    .map(cell => cell.trim().replaceAll(" ", "_").replaceAll("-", "_"));

  for (const row of rows.slice(1)) {
    // Clean up the row and split by the pipe symbol to get individual cells
    const raw_cells = row.trim().split("|");
    const cells = raw_cells
      .slice(1, raw_cells.length - 1)
      .map((cell, ind) => ({
        key: headers[ind],
        value: cell.trim(),
      }));

    if (cells.length === 0 || cells[0].value.includes(":-") || cells[0].value.includes("-:") || cells[0].value.split("").every(char => char === '-' || char === '=')) {
      continue;
    } else {
      res.push(cells);
    }
  }
  return [res, headers];
}

export function genArgCode(cell: ParsedCell): string {
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

export const genGeneratorArgs = (argCells: ParsedCell[]) => {
  if (argCells.length === 0) {
    return "";
  }
  return `\n${argCells
    .filter((cell) => !!cell.value)
    .map(genArgCode)
    .join(",\n")}\n\t`;
};

export function genJSDoc<T extends string>(generator_name: T, paramNames: string[], returnTypes: Record<string, string>) {
  const paramLines = paramNames.map(param => ` *  ${param}?: any;`).join('\n');
  return `/**\n * Generated function\n * @param {{\n${paramLines}\n * }} config\n * @returns {${returnTypes[generator_name]}}\n */`;
}

export function genGeneratorFunctionCode<T extends string>(
  generator_name: T,
  paramNames: string[],
  returnTypes: Record<T, string>,
  generatorBoilerplate: Record<T, string>
) {
  return `${genJSDoc(generator_name, paramNames, returnTypes)}\nexport const ${generator_name} = (config) => {\n${generatorBoilerplate[generator_name]}\n}`;
}

export function genGeneratorSignatures<T extends string>(
  generatorNames: T[],
  paramNames: string[],
  returnTypes: Record<T, string>,
  generatorBoilerplate: Record<T, string>): string {

  // Generate the three function signatures
  return generatorNames.map((generatorName) => genGeneratorFunctionCode(generatorName, paramNames, returnTypes, generatorBoilerplate)).join("\n\n");
}
