import { useEffect, useState } from "react";
import Button, { ButtonVariant } from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import Grid from "src/atoms/containers/grid/Grid";
import Text from "src/atoms/text/Text";
import {
  emptyGrid,
  getCentoid,
  horizontalFlip,
  rotateClockwise,
  rotateCounterClockwise,
  verticalFlip,
} from "src/utils/matrix-operations";
import { numToColor } from "src/utils/utils";

interface EditorProps {
  keyboardCaptureOpject: any;
}

const Editor = ({ keyboardCaptureOpject }: EditorProps) => {
  const [gridState, setGridState] = useState<number[][]>([
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);

  const [clipboard, setClipboard] = useState<number[][]>([]);

  const [selected, setSelected] = useState<number[][]>(emptyGrid(5, 5, -1));

  const [mode, setMode] = useState<"select" | "draw">("select");
  const [multiSelectKeyPressed, setMultiSelectKeyPressed] =
    useState<boolean>(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.key === "Shift" ||
      event.key === "Control" ||
      event.key === "Meta"
    ) {
      setMultiSelectKeyPressed(true);
    }

    console.log(event.key);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (
      event.key === "Shift" ||
      event.key === "Control" ||
      event.key === "Meta"
    ) {
      setMultiSelectKeyPressed(false);
    }

    console.log(event.key);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleGridClick = (rowIndex: number, cellIndex: number) => {
    if (mode === "select") {
      const newSelected = multiSelectKeyPressed
        ? [...selected]
        : emptyGrid(5, 5, -1);
      newSelected[rowIndex][cellIndex] =
        selected[rowIndex][cellIndex] === -1
          ? gridState[rowIndex][cellIndex]
          : -1;
      setSelected(newSelected);

      console.log(getCentoid(newSelected));
    } else if (mode === "draw") {
      const newGridState = [...gridState];
      newGridState[rowIndex][cellIndex] = 1;
      setGridState(newGridState);
    }
  };

  return (
    <Flex flexDirection={"column"} justifyContent={"center"}>
      <h1>Editor</h1>

      <Flex justifyContent={"space-between"}>
        <Grid
          gridTemplateColumns={"repeat(5, 80px)"}
          gap={"1px"}
          justifyContent={"center"}
        >
          {gridState.map((row, rowIndex) => {
            return row.map((cell, cellIndex) => {
              return (
                <Button
                  key={`${rowIndex}-${cellIndex}`}
                  onClick={() => handleGridClick(rowIndex, cellIndex)}
                >
                  <Flex
                    width={"80px"}
                    height={"80px"}
                    style={{
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background:
                          selected[rowIndex][cellIndex] !== -1
                            ? numToColor(selected[rowIndex][cellIndex])
                            : numToColor(cell),
                      }}
                    ></div>

                    {selected[rowIndex][cellIndex] !== -1 && (
                      <div
                        style={{
                          position: "absolute",
                          width: "calc(100% - 6px)",
                          height: "calc(100% - 6px)",
                          background: "rgba(255,255,255,0.5)",

                          border: "3px dotted black",
                        }}
                      ></div>
                    )}
                  </Flex>
                </Button>
              );
            });
          })}
        </Grid>

        <Flex flexDirection={"column"} gap={"10px"}>
          <Button
            variant={
              mode === "select"
                ? ButtonVariant.contained
                : ButtonVariant.outlined
            }
            onClick={() => {
              setMode("select");
            }}
          >
            <Text>Select</Text>
          </Button>

          <Button
            variant={
              mode === "draw" ? ButtonVariant.contained : ButtonVariant.outlined
            }
            onClick={() => {
              setMode("draw");
            }}
          >
            <Text>Draw</Text>
          </Button>
        </Flex>
      </Flex>

      <h2>Actions</h2>
      <Flex gap={"10px"}>
        <Button
          variant={ButtonVariant.contained}
          onClick={() => setGridState(verticalFlip)}
        >
          <Text>Vertical Flip</Text>
        </Button>
        <Button
          variant={ButtonVariant.contained}
          onClick={() => setGridState(horizontalFlip)}
        >
          <Text>Horizontal Flip</Text>
        </Button>

        <Button
          variant={ButtonVariant.contained}
          onClick={() => setGridState(rotateClockwise)}
        >
          <Text>Rotate Clockwise</Text>
        </Button>

        <Button
          variant={ButtonVariant.contained}
          onClick={() => setGridState(rotateCounterClockwise)}
        >
          <Text>Rotate Counter Clockwise</Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Editor;
