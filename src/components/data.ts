export const vertexSampleTable = `
|                   setup                  |          UI          |
| experiment completed | protocol is ready | delete btn | add btn |
| :------------------- | :---------------- | ---------: | ------: |
| false                | false             | true       | true    |
|                      | true              | false      | false   |
| true                 |                   | false      | false   |
| true                 | true              | null       | null    |
`;

export const edgeSampleTable = `
| phase        | solvent | solution_c | solution_v | MW     | density | ω    | C    | count | amount  | mass  | volume |
| ------------ | ------- | ---------- | ---------- | ------ | ------- | -----| ---- | ----- | ------- | ----- | ------ |
|--------------|---------|------------|------------|--------|---------|------|------|-------|---------|-------|--------|
| setup        |         |            |            |        |         |      |      |       |         |       |        |
| transition   |         |            |            |        |         |      |      |       | 0       |       |        |
| elements     |         |            |            |        |         |      |      |       | 0       |       |        |
|--------------|---------|------------|------------|--------|---------|------|------|-------|---------|-------|--------|
| setup        |         |            |            |        |         |      |      |       |         |       |        |
| transition   |         |            |            |        |         |      |      |       | null    |       |        |
| elements     |         |            |            |        |         |      |      |       | null    |       |        |
|==============|=========|============|============|========|=========|======|======|=======|=========|=======|========|
| setup        | 42      |            | 10         |        |         |      |      |       | null    |       |        |
| transition   |         |            |            |        |         |      |      |       | 10 umol |       |        |
| elements     | 42      | 1          | 10         |        |         |      |      |       | 10 umol |       |        |
|--------------|---------|------------|------------|--------|---------|------|------|-------|---------|-------|--------|
| setup        | 42      | 10         |            |        |         |      |      |       | null    |       |        |
| transition   |         |            |            |        |         |      |      |       | 10 umol |       |        |
| elements     |         |            | 1          |        |         |      |      |       | 10 umol |       |        |
|--------------|---------|------------|------------|--------|---------|------|------|-------|---------|-------|--------|
| setup        |         |            |            |        |         |      |      |       |         |       |        |
| transition   |         |            |            |        |         |      |      |       | 2 mmol  |       |        |
| elements     |         |            |            |        |         |      |      |       | 2 mmol  | 2 mg  | 2 mL   |
|==============|=========|============|============|========|=========|======|======|=======|=========|=======|========|
| setup        |         |            |            |        |         |      |      |       |         |       |        |
| transition   |         |            |            |        |         |      |      |       |         | 2 mg  |        |
| elements     |         |            |            |        |         |      |      |       | 2 mmol  | 2 mg  | 2 mL   |
|--------------|---------|------------|------------|--------|---------|------|------|-------|---------|-------|--------|
| setup        | 42      | 1          |            |        |         |      |      |       |         |       |        |
| transition   |         |            |            |        |         |      |      |       |         | 2 mg  |        |
| elements     |         |            | 2 mL       |        |         |      |      |       | 2 mmol  | 2 mg  | 2 mL   |
|--------------|---------|------------|------------|--------|---------|------|------|-------|---------|-------|--------|
| setup        | 42      |            | 1 mL       |        |         |      |      |       |         |       |        |
| transition   |         |            |            |        |         |      |      |       |         | 2 mg  |        |
| elements     |         | 2 M        | 1 mL       |        |         |      |      |       | 2 mmol  | 2 mg  | 2 mL   |
|==============|=========|============|============|========|=========|======|======|=======|=========|=======|========|
| setup        |         |            |            |        |         |      |      |       |         |       |        |
| transition   |         |            |            |        |         |      |      |       |         |       | 3 uL   |
| elements     |         |            |            |        |         |      |      |       | 3 umol  | 3 ug  | 3 uL   |
|--------------|---------|------------|------------|--------|---------|------|------|-------|---------|-------|--------|
| setup        | 42      | 0.5        |            |        |         |      |      |       |         |       |        |
| transition   |         |            |            |        |         |      |      |       |         |       | 3 uL   |
| elements     |         | 0.5        | 6 uL       |        |         |      |      |       | 3 umol  | 3 ug  | 3 uL   |
|--------------|---------|------------|------------|--------|---------|------|------|-------|---------|-------|--------|
| setup        | 42      |            | 4          |        |         |      |      |       |         |       |        |
| transition   |         |            |            |        |         |      |      |       |         |       | 3 uL   |
| elements     |         | 0.5        |            |        |         |      |      |       | 3 umol  | 3 ug  | 3 uL   |
|==============|=========|============|============|========|=========|======|======|=======|=========|=======|========|
| setup        |         |            |            |        |         |      |      |       | 4 mmol  |       |        |
| transition   |         |            |            |        |         | 80%  |      |       |         |       |        |
| elements     |         |            |            |        |         | 80%  | .8 M |       | 4 mmol  | 5 mg  | 5 mL   |
|==============|=========|============|============|========|=========|======|======|=======|=========|=======|========|
| setup        |         |            |            |        |         |      |      |       |         |       |        |
| transition   |         |            |            |        |         |      | 2 M  |       |         |       |        |
| elements     |         |            |            |        |         | 2    |      |       |         |       |        |
|==============|=========|============|============|========|=========|======|======|=======|=========|=======|========|
| setup        |         |            |            |        |         |      |      |       |         |       |        |
| transition   |         |            |            |        | 2 g/L   |      |      |       |         |       |        |
| elements     |         |            |            |        | 2 g/L   |      | 2 M  |       |         |       | 0.5 mL |
|==============|=========|============|============|========|=========|======|======|=======|=========|=======|========|
| setup        | 42      |            |            |        |         |      |      |       |         |       |        |
| transition   |         |            | 20 mL      |        |         |      |      |       |         |       |        |
| elements     | 42      | 0.05 M     | 20 mL      |        |         |      |      |       |         |       |        |
|==============|=========|============|============|========|=========|======|======|=======|=========|=======|========|
| setup        | 42      | 1 M        |            |        |         |      |      |       |         |       |        |
| transition   |         |            | 20 mL      |        |         |      |      |       |         |       |        |
| elements     |         | 1 M        | 20 mL      |        |         |      |      |       | 20 mmol | 20 mg | 20 mL  |
|==============|=========|============|============|========|=========|======|======|=======|=========|=======|========|
| setup        | 42      |            |            |        |         |      |      |       |         |       |        |
| transition   |         | 2 M        |            |        |         |      |      |       |         |       |        |
| elements     | 42      | 2 M        | 0.5 mL     |        |         |      |      |       |         |       |        |
|==============|=========|============|============|========|=========|======|======|=======|=========|=======|========|
| setup        | 42      |            |            |        |         |      |      |       |         |       |        |
| transition   |         | 2 M        |            |        |         |      |      |       |         |       |        |
| elements     |         | 2 M        | 0.5 mL     |        |         |      |      |       |         |       |        |
|==============|=========|============|============|========|=========|======|======|=======|=========|=======|========|
| setup        | 42      |            | 1 mL       |        |         |      |      |       |         |       |        |
| transition   |         | 2 M        |            |        |         |      |      |       |         |       |        |
| elements     | 42      | 2 M        | 0.5 mL     |        |         |      |      |       | 2 mmol  | 2 mg  | 2 mL   |
`;

const graphQueryLanguageSampleQuery = ``;



`
+====+============+=======+============+====+=====+=====+=====+=======+============================+====+=====+==============+====+=====+=======+=============+============+============+=====+=============+=============+====+==========+=====+====+======+
| MODEL DATA                                                                                                                                                  | VIEW DATA                                                                                   |
+----+------------+-------+------------+----+-----+-----+-----+-------+----------------------------+----+-----+--------------+----+-----+-------+-------------+------------+------------+-----+-------------+-------------+----+----------+-----+----+------+
|                 |                    |          | compound_substances                            | QCs                                                      |            | analytical       |             | actual value                | historical values
| substance       | qc_type            | protocol +-----+------------------------------------------+-------------------------+--------------------------------+            + data             +             +-------------+----+----------+-----+----+------+
|                 |                    |          |     | composition_spec                         | operation               | qc_records                     | substance  |                  | reference   |             | operation     |     | operation |
+----+------------+-------+------------+----+-----+ sid +-----+-------+----------------------------+----+-----+--------------+----+-----+-------+-------------+            +------------+-----+             + m_v         +----+----------+ m_v +----+------+
| id | name       | key   | title      | id | otk |     | pid | qctk  | reference                  | id | pid | completed_at | id | sid | qctk  | m_v         |            | qctt       | otk |             |             | id | date     |     | id | date |
+====+============+=======+============+====+=====+=====+=====+=======+============================+====+=====+==============+====+=====+=======+=============+============+============+=====+=============+=============+====+==========+=====+====+======+
| substance variations:                                                                                                                                                                                                                                     |
+----+------------+-------+------------+----+-----+-----+-----+-------+----------------------------+----+-----+--------------+----+-----+-------+-------------+------------+------------+-----+-------------+-------------+----+----------+-----+----+------+
|    |            | qctk0 | appearance |    |     | 0   |     | qctk0 | exact_value: “blue liquid” |    |     |              |    |     |       |             |            | appearance |     | blue liquid |             |    |          |     |    |      |
+----+------------+-------+------------+----+-----+-----+-----+-------+----------------------------+----+-----+--------------+----+-----+-------+-------------+------------+------------+-----+-------------+-------------+----+----------+-----+----+------+
|    |            | qctk0 | appearance |    |     | 0   |     | qctk0 | exact_value: “blue liquid” | 1  |     | {{time01}}   |    | 0   | qctk0 | blue liquid |            | appearance |     | blue liquid | blue liquid | 1  | 30.11.21 |     |    |      |
+----+------------+-------+------------+----+-----+-----+-----+-------+----------------------------+----+-----+--------------+----+-----+-------+-------------+------------+------------+-----+-------------+-------------+----+----------+-----+----+------+
|    |            | qctk0 | appearance |    |     |     |     |       |                            | 1  |     | {{time01}}   |    | 0   | qctk0 | blue liquid |            | appearance |     |             | blue liquid | 1  | 30.11.21 |     |    |      |
+----+------------+-------+------------+----+-----+-----+-----+-------+----------------------------+----+-----+--------------+----+-----+-------+-------------+------------+------------+-----+-------------+-------------+----+----------+-----+----+------+
| 10 | {{name10}} | qctk0 | appearance |    |     | 10  |     | qctk0 | exact_value: “blue liquid” |    |     |              |    |     |       |             | {{name10}} | appearance |     | blue liquid |             |    |          |     |    |      |
+----+------------+-------+------------+----+-----+-----+-----+-------+----------------------------+----+-----+--------------+----+-----+-------+-------------+------------+------------+-----+-------------+-------------+----+----------+-----+----+------+
| 10 | {{name10}} | qctk0 | appearance |    |     | 10  |     | qctk0 | exact_value: “blue liquid” | 1  |     | {{time01}}   |    | 10  | qctk0 | blue liquid | {{name10}} | appearance |     | blue liquid | blue liquid | 1  | 30.11.21 |     |    |      |
+----+------------+-------+------------+----+-----+-----+-----+-------+----------------------------+----+-----+--------------+----+-----+-------+-------------+------------+------------+-----+-------------+-------------+----+----------+-----+----+------+
| 10 | {{name10}} | qctk0 | appearance |    |     |     |     |       |                            | 1  |     | {{time01}}   |    | 10  | qctk0 | blue liquid | {{name10}} | appearance |     |             | blue liquid | 1  | 30.11.21 |     |    |      |
+====+============+=======+============+====+=====+=====+=====+=======+============================+====+=====+==============+====+=====+=======+=============+============+============+=====+=============+=============+====+==========+=====+====+======+
| qc_type variations:                                                                                                                                                                                                                                       |
+----+------------+-------+------------+----+-----+-----+-----+-------+----------------------------+----+-----+--------------+----+-----+-------+-------------+------------+------------+-----+-------------+-------------+----+----------+-----+----+------+
| 10 | {{name10}} | qctk1 | mol%       |    |     | 10  |     | qctk1 | min_value: 95              |    |     |              |    |     |       |             | {{name10}} | mol%       |     | >= 95       |             |    |          |     |    |      |
+----+------------+-------+------------+----+-----+-----+-----+-------+----------------------------+----+-----+--------------+----+-----+-------+-------------+------------+------------+-----+-------------+-------------+----+----------+-----+----+------+
| 10 | {{name10}} | qctk1 | mol%       |    |     | 10  |     | qctk1 | min_value: 95              | 1  |     | {{time01}}   |    | 10  | qctk1 | 98          | {{name10}} | mol%       |     | >= 95       | 98          | 1  | 30.11.21 |     |    |      |
+----+------------+-------+------------+----+-----+-----+-----+-------+----------------------------+----+-----+--------------+----+-----+-------+-------------+------------+------------+-----+-------------+-------------+----+----------+-----+----+------+
| 10 | {{name10}} | qctk1 | mol%       |    |     |     |     |       |                            | 1  |     | {{time01}}   |    | 10  | qctk1 | 98          | {{name10}} | mol%       |     |             | 98          | 1  | 30.11.21 |     |    |      |
+----+------------+-------+------------+----+-----+-----+-----+-------+----------------------------+----+-----+--------------+----+-----+-------+-------------+------------+------------+-----+-------------+-------------+----+----------+-----+----+------+
| 10 | {{name10}} | qctk2 | OD%(260)   |    |     | 10  |     | qctk2 | min_value: 95              |    |     |              |    |     |       |             | {{name10}} | OD%(260)   |     | >= 95       |             |    |          |     |    |      |
+----+------------+-------+------------+----+-----+-----+-----+-------+----------------------------+----+-----+--------------+----+-----+-------+-------------+------------+------------+-----+-------------+-------------+----+----------+-----+----+------+
| 10 | {{name10}} | qctk2 | OD%(260)   |    |     | 10  |     | qctk2 | min_value: 95              | 1  |     | {{time01}}   |    | 10  | qctk2 | 98          | {{name10}} | OD%(260)   |     | >= 95       | 98          | 1  | 30.11.21 |     |    |      |
+----+------------+-------+------------+----+-----+-----+-----+-------+----------------------------+----+-----+--------------+----+-----+-------+-------------+------------+------------+-----+-------------+-------------+----+----------+-----+----+------+
| 10 | {{name10}} | qctk2 | OD%(260)   |    |     |     |     |       |                            | 1  |     | {{time01}}   |    | 10  | qctk2 | 98          | {{name10}} | OD%(260)   |     |             | 98          | 1  | 30.11.21 |     |    |      |
+----+------------+-------+------------+----+-----+-----+-----+-------+----------------------------+----+-----+--------------+----+-----+-------+-------------+------------+------------+-----+-------------+-------------+----+----------+-----+----+------+

Table 2
+====+============+=======+=======+====+========+=====+=====+=======+==============================+====+=====+==============+====+=====+=======+=====+============+======+========+===========+=====+====+==========+=====+====+======+
| MODEL DATA                                                                                                                                          | VIEW DATA                                                                      |
+----+------------+-------+-------+----+--------+-----+-----+-------+------------------------------+----+-----+--------------+----+-----+-------+-----+------------+------+--------+-----------+-----+----+----------+-----+----+------+
|                 |               |             | compound_substances                              | QCs                                              |            | analytical    |           | actual value        | historical values
| substance       | qc_type       | protocol    +-----+--------------------------------------------+-------------------------+------------------------+            + data          +           +-----+----+----------+-----+----+------+
|                 |               |             |     | composition_spec                           | operation               | qc_records             | substance  |               | reference |     | operation     |     | operation |
+----+------------+-------+-------+----+--------+ sid +-----+-------+------------------------------+----+-----+--------------+----+-----+-------+-----+            +------+--------+           + m_v +----+----------+ m_v +----+------+
| id | name       | key   | title | id | otk    |     | pid | qctk  | reference                    | id | pid | completed_at | id | sid | qctk  | m_v |            | qctt | otk    |           |     | id | date     |     | id | date |
+====+============+=======+=======+====+========+=====+=====+=======+==============================+====+=====+==============+====+=====+=======+=====+============+======+========+===========+=====+====+==========+=====+====+======+
| protocol variations:                                                                                                                                                                                                                 |
+----+------------+-------+-------+----+--------+-----+-----+-------+------------------------------+----+-----+--------------+----+-----+-------+-----+------------+------+--------+-----------+-----+----+----------+-----+----+------+
| 10 | {{name10}} | qctk1 | mol%  |    |        | 10  |     | qctk1 | min_value: 95                |    |     |              |    |     |       |     | {{name10}} | mol% |        | >= 95     |     |    |          |     |    |      |
+----+------------+-------+-------+----+--------+-----+-----+-------+------------------------------+----+-----+--------------+----+-----+-------+-----+------------+------+--------+-----------+-----+----+----------+-----+----+------+
| 10 | {{name10}} | qctk1 | mol%  |    |        | 10  |     | qctk1 | min_value: 95                | 1  |     | {{time01}}   |    | 10  | qctk1 | 98  | {{name10}} | mol% |        | >= 95     | 98  | 1  | 30.11.21 |     |    |      |
+----+------------+-------+-------+----+--------+-----+-----+-------+------------------------------+----+-----+--------------+----+-----+-------+-----+------------+------+--------+-----------+-----+----+----------+-----+----+------+
| 10 | {{name10}} | qctk1 | mol%  |    |        |     |     |       |                              | 1  |     | {{time01}}   |    | 10  | qctk1 | 98  | {{name10}} | mol% |        |           | 98  | 1  | 30.11.21 |     |    |      |
+----+------------+-------+-------+----+--------+-----+-----+-------+------------------------------+----+-----+--------------+----+-----+-------+-----+------------+------+--------+-----------+-----+----+----------+-----+----+------+
| 10 | {{name10}} | qctk1 | mol%  | 11 | {{t1}} | 10  | 11  | qctk1 | min_value: 95                |    |     |              |    |     |       |     | {{name10}} | mol% | {{t1}} | >= 95     |     |    |          |     |    |      |
+----+------------+-------+-------+----+--------+-----+-----+-------+------------------------------+----+-----+--------------+----+-----+-------+-----+------------+------+--------+-----------+-----+----+----------+-----+----+------+
| 10 | {{name10}} | qctk1 | mol%  | 11 | {{t1}} | 10  | 11  | qctk1 | min_value: 95                | 1  | 11  | {{time01}}   |    | 10  | qctk1 | 98  | {{name10}} | mol% | {{t1}} | >= 95     | 98  | 1  | 30.11.21 |     |    |      |
+----+------------+-------+-------+----+--------+-----+-----+-------+------------------------------+----+-----+--------------+----+-----+-------+-----+------------+------+--------+-----------+-----+----+----------+-----+----+------+
| 10 | {{name10}} | qctk1 | mol%  | 11 | {{t1}} |     |     |       |                              | 1  | 11  | {{time01}}   |    | 10  | qctk1 | 98  | {{name10}} | mol% | {{t1}} |           | 98  | 1  | 30.11.21 |     |    |      |
+====+============+=======+=======+====+========+=====+=====+=======+==============================+====+=====+==============+====+=====+=======+=====+============+======+========+===========+=====+====+==========+=====+====+======+
| reference variations:                                                                                                                                                                                                                |
+----+------------+-------+-------+----+--------+-----+-----+-------+------------------------------+----+-----+--------------+----+-----+-------+-----+------------+------+--------+-----------+-----+----+----------+-----+----+------+
|    |            | qctk1 | mol%  |    |        | 0   |     | qctk1 | exact_value: 96              |    |     |              |    |     |       |     |            | mol% |        | 96        |     |    |          |     |    |      |
+----+------------+-------+-------+----+--------+-----+-----+-------+------------------------------+----+-----+--------------+----+-----+-------+-----+------------+------+--------+-----------+-----+----+----------+-----+----+------+
|    |            | qctk1 | mol%  |    |        | 0   |     | qctk1 | min_value: 95                |    |     |              |    |     |       |     |            | mol% |        | >= 95     |     |    |          |     |    |      |
+----+------------+-------+-------+----+--------+-----+-----+-------+------------------------------+----+-----+--------------+----+-----+-------+-----+------------+------+--------+-----------+-----+----+----------+-----+----+------+
|    |            | qctk1 | mol%  |    |        | 0   |     | qctk1 | max_value: 97                |    |     |              |    |     |       |     |            | mol% |        | <= 97     |     |    |          |     |    |      |
+----+------------+-------+-------+----+--------+-----+-----+-------+------------------------------+----+-----+--------------+----+-----+-------+-----+------------+------+--------+-----------+-----+----+----------+-----+----+------+
|    |            | qctk1 | mol%  |    |        | 0   |     | qctk1 | min_value: 95, max_value: 97 |    |     |              |    |     |       |     |            | mol% |        | >= 95     |     |    |          |     |    |      |
|    |            |       |       |    |        |     |     |       |                              |    |     |              |    |     |       |     |            |      |        |           |     |    |          |     |    |      |
|    |            |       |       |    |        |     |     |       |                              |    |     |              |    |     |       |     |            |      |        | <= 97     |     |    |          |     |    |      |
+----+------------+-------+-------+----+--------+-----+-----+-------+------------------------------+----+-----+--------------+----+-----+-------+-----+------------+------+--------+-----------+-----+----+----------+-----+----+------+

Table 3
+====+============+=======+============+====+=====+=====+=====+=======+===============+====+=====+==============+====+=====+=======+==============+============+============+=====+===========+==============+====+==========+=====+====+======+
| MODEL DATA                                                                                                                                      | VIEW DATA                                                                                  |
+----+------------+-------+------------+----+-----+-----+-----+-------+---------------+----+-----+--------------+----+-----+-------+--------------+------------+------------+-----+-----------+--------------+----+----------+-----+----+------+
|                 |                    |          | compound_substances               | QCs                                                       |            | analytical       |           | actual value                 | historical values
| substance       | qc_type            | protocol +-----+-----------------------------+-------------------------+---------------------------------+            + data             +           +--------------+----+----------+-----+----+------+
|                 |                    |          |     | composition_spec            | operation               | qc_records                      | substance  |                  | reference |              | operation     |     | operation |
+----+------------+-------+------------+----+-----+ sid +-----+-------+---------------+----+-----+--------------+----+-----+-------+--------------+            +------------+-----+           + m_v          +----+----------+ m_v +----+------+
| id | name       | key   | title      | id | otk |     | pid | qctk  | reference     | id | pid | completed_at | id | sid | qctk  | m_v          |            | qctt       | otk |           |              | id | date     |     | id | date |
+====+============+=======+============+====+=====+=====+=====+=======+===============+====+=====+==============+====+=====+=======+==============+============+============+=====+===========+==============+====+==========+=====+====+======+
| completed_at variations:                                                                                                                                                                                                                     |
+----+------------+-------+------------+----+-----+-----+-----+-------+---------------+----+-----+--------------+----+-----+-------+--------------+------------+------------+-----+-----------+--------------+----+----------+-----+----+------+
| 10 | {{name10}} | qctk1 | mol%       |    |     | 10  |     | qctk1 | min_value: 95 | 1  |     | {{time01}}   |    | 10  | qctk1 | 98           | {{name10}} | mol%       |     | >= 95     | 98           | 1  | 30.11.21 |     |    |      |
+----+------------+-------+------------+----+-----+-----+-----+-------+---------------+----+-----+--------------+----+-----+-------+--------------+------------+------------+-----+-----------+--------------+----+----------+-----+----+------+
| 10 | {{name10}} | qctk1 | mol%       |    |     | 10  |     | qctk1 | min_value: 95 | 1  |     | {{time02}}   |    | 10  | qctk1 | 98           | {{name10}} | mol%       |     | >= 95     | 98           | 1  | 01.09.22 |     |    |      |
+----+------------+-------+------------+----+-----+-----+-----+-------+---------------+----+-----+--------------+----+-----+-------+--------------+------------+------------+-----+-----------+--------------+----+----------+-----+----+------+
| 10 | {{name10}} | qctk1 | mol%       |    |     | 10  |     | qctk1 | min_value: 95 | 1  |     | {{time03}}   |    | 10  | qctk1 | 98           | {{name10}} | mol%       |     | >= 95     | 98           | 1  | 12.07.23 |     |    |      |
+====+============+=======+============+====+=====+=====+=====+=======+===============+====+=====+==============+====+=====+=======+==============+============+============+=====+===========+==============+====+==========+=====+====+======+
| measurement_value variations:                                                                                                                                                                                                                |
+----+------------+-------+------------+----+-----+-----+-----+-------+---------------+----+-----+--------------+----+-----+-------+--------------+------------+------------+-----+-----------+--------------+----+----------+-----+----+------+
|    |            | qctk0 | appearance |    |     |     |     |       |               | 1  |     | {{time01}}   |    | 0   | qctk0 | green liquid |            | appearance |     |           | green liquid | 1  | 30.11.21 |     |    |      |
+----+------------+-------+------------+----+-----+-----+-----+-------+---------------+----+-----+--------------+----+-----+-------+--------------+------------+------------+-----+-----------+--------------+----+----------+-----+----+------+
|    |            | qctk0 | appearance |    |     |     |     |       |               | 1  |     | {{time01}}   |    | 0   | qctk0 | red liquid   |            | appearance |     |           | red liquid   | 1  | 30.11.21 |     |    |      |
+----+------------+-------+------------+----+-----+-----+-----+-------+---------------+----+-----+--------------+----+-----+-------+--------------+------------+------------+-----+-----------+--------------+----+----------+-----+----+------+

Table 4
+====+======+=======+============+====+=====+=====+=====+======+===========+====+=====+==============+====+=====+=======+=============+===========+============+=====+===========+=============+====+==========+=============+====+==========+
| MODEL DATA                                                                                                                          | VIEW DATA                                                                                            |
+----+------+-------+------------+----+-----+-----+-----+------+-----------+----+-----+--------------+----+-----+-------+-------------+-----------+------------+-----+-----------+-------------+----+----------+-------------+----+----------+
|           |                    |          | compound_substances          | QCs                                                      |           | analytical       |           | actual value                | historical values           |
| substance | qc_type            | protocol +-----+------------------------+-------------------------+--------------------------------+           + data             +           +-------------+----+----------+-------------+----+----------+
|           |                    |          |     | composition_spec       | operation               | qc_records                     | substance |                  | reference |             | operation     |             | operation     |
+----+------+-------+------------+----+-----+ sid +-----+------+-----------+----+-----+--------------+----+-----+-------+-------------+           +------------+-----+           + m_v         +----+----------+ m_v         +----+----------+
| id | name | key   | title      | id | otk |     | pid | qctk | reference | id | pid | completed_at | id | sid | qctk  | m_v         |           | qctt       | otk |           |             | id | date     |             | id | date     |
+====+======+=======+============+====+=====+=====+=====+======+===========+====+=====+==============+====+=====+=======+=============+===========+============+=====+===========+=============+====+==========+=============+====+==========+
| historical values variations:                                                                                                                                                                                                              |
+----+------+-------+------------+----+-----+-----+-----+------+-----------+----+-----+--------------+----+-----+-------+-------------+-----------+------------+-----+-----------+-------------+----+----------+-------------+----+----------+
|    |      | qctk0 | appearance |    |     |     |     |      |           | 1  |     | {{time01}}   |    | 0   | qctk0 | blue liquid |           | appearance |     |           | blue liquid | 1  | 30.11.21 |             |    |          |
+----+------+-------+------------+----+-----+-----+-----+------+-----------+----+-----+--------------+----+-----+-------+-------------+-----------+------------+-----+-----------+-------------+----+----------+-------------+----+----------+
|    |      | qctk0 | appearance |    |     |     |     |      |           | 1  |     | {{time01}}   |    | 0   | qctk0 | blue liquid |           | appearance |     |           | blue liquid | 2  | 01.09.22 | blue liquid | 1  | 30.11.21 |
|    |      |       |            |    |     |     |     |      |           | 2  |     | {{time02}}   |    | 0   | qctk0 | blue liquid |           |            |     |           |             |    |          |             |    |          |
+----+------+-------+------------+----+-----+-----+-----+------+-----------+----+-----+--------------+----+-----+-------+-------------+-----------+------------+-----+-----------+-------------+----+----------+-------------+----+----------+
|    |      | qctk0 | appearance |    |     |     |     |      |           | 1  |     | {{time01}}   |    | 0   | qctk0 | blue liquid |           | appearance |     |           | blue liquid | 3  | 12.07.23 | blue liquid | 2  | 01.09.22 |
|    |      |       |            |    |     |     |     |      |           | 2  |     | {{time02}}   |    | 0   | qctk0 | blue liquid |           |            |     |           |             |    |          | blue liquid | 1  | 30.11.21 |
|    |      |       |            |    |     |     |     |      |           | 3  |     | {{time03}}   |    | 0   | qctk0 | blue liquid |           |            |     |           |             |    |          |             |    |          |
+----+------+-------+------------+----+-----+-----+-----+------+-----------+----+-----+--------------+----+-----+-------+-------------+-----------+------------+-----+-----------+-------------+----+----------+-------------+----+----------+`