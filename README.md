https://github.com/VitalyGryaznov/challenge-knime/assets/19794086/3e38e67e-2e4c-4dbd-b055-dd2860369a3a

## **What is implemented**

- can add a block using search bar
- can move blocks on the canvas
- deployed on <https://stackblitz.com/github//VitalyGryaznov/challenge-knime>

## Some **implementation** details:

- data is mocked in `src/dataMock.ts`

  where `workflowMock` is mocking data of existing workflow

  `workflowsBlcockMock` is mocking available workflow blocks list.

- I see that behavior in stackblitz is a bit different from behavior in chrome when I run app locally. I did not investigate yet why it is happening.
- Added only tests for SearchBar component as an example
