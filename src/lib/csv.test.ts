import test from "node:test";
import assert from "node:assert/strict";
import { toCsv } from "./csv";

test("quotes values containing commas, quotes, or newlines", () => {
  const rows = [
    {
      title: "Write docs, notes",
      description: 'Need to use "quotes" and line breaks\nsecond line',
      status: "IN_PROGRESS",
    },
  ];

  const csv = toCsv(rows);

  assert.match(csv, /title,description,status/);
  assert.match(csv, /"Write docs, notes"/);
  assert.match(csv, /"Need to use ""quotes"" and line breaks\nsecond line"/);
});

test("returns an empty string for empty rows", () => {
  assert.equal(toCsv([]), "");
});
