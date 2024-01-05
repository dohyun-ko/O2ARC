import Flex from "src/atoms/containers/flex/Flex";
import Grid from "src/atoms/containers/grid/Grid";
import { numToColor } from "src/utils/utils";

interface GridViewProps {
  grid: number[][];
}

const GridView = ({ grid }: GridViewProps) => {
  return (
    <Flex flexDirection={"column"}>
      <h1>GridView</h1>

      <Grid gridTemplateColumns={"repeat(5, 1fr)"} gap={"1px"}>
        {grid.map((row, rowIndex) => {
          return row.map((cell, cellIndex) => {
            return (
              <div
                key={`${rowIndex}-${cellIndex}`}
                style={{
                  width: "80px",
                  height: "80px",
                  background: numToColor(cell),
                }}
              ></div>
            );
          });
        })}
      </Grid>
    </Flex>
  );
};

export default GridView;
