import { table } from "./plussed-table";

class ParsedCell {
  constructor(key, parent, content) {
    this.key = key;
    this.parent = parent;
    this.content = content;
  }
}

class SpannedCell {

}

// Function to split a row into columns
function splitRow(row) {
  return row.split('|').map(col => col.trim()).filter(col => col);
}

// Function to calculate column spans
function calculateSpans(row) {
  return row.split('+')
    .filter(col => col.split("").every(char => char === "-" || char))
    .map(col => col.length - 1) // Count the dashes between + symbols
    .filter(colWidth => colWidth > 0)
}

function genHierarchy() {
  const resMap = new Map<string, ParsedCell>();
  return resMap;
}

function parseAsciiTable(tableString) {
  const rows = tableString.split('\n').filter(row => row.trim() !== '');
  const headerRows = [];
  const dataRows = [];

  let inHeader = true;

  // Identify where the headers end and content begins
  for (const row of rows) {
    if (row.includes('+')) continue;  // Skip line separators
    if (inHeader && row.includes('|')) {
      headerRows.push(row);
    } else if (row.includes('|')) {
      inHeader = false;
      dataRows.push(row);
    }
  }

  const hierarchy = genHierarchy(headerRows);

  for (const row of dataRows) {
    const
  }

}

const res = parseAsciiTable(table);

console.log(res);
