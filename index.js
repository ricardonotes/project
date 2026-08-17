const COLS = 50;
const ROWS = 50;
let matrix = [];
const arrayAll = [
  [16, 30],
  [17, 30],
  [16, 29],
  [17, 29],
  [16, 28],
  [17, 28],
  [16, 27],
  [17, 27],
  [17, 26],
  [16, 26],
  [16, 25],
  [17, 25],
  [17, 24],
  [16, 24],
  [16, 23],
  [17, 23],
  [17, 22],
  [16, 21],
  [16, 22],
  [17, 21],
  [17, 20],
  [16, 20],
  [16, 19],
  [17, 19],
  [18, 19],
  [19, 19],
  [20, 19],
  [21, 19],
  [22, 19],
  [23, 19],
  [23, 20],
  [23, 22],
  [23, 21],
  [23, 23],
  [23, 24],
  [23, 25],
  [23, 26],
  [23, 27],
  [23, 28],
  [23, 29],
  [23, 30],
  [22, 30],
  [22, 29],
  [22, 28],
  [22, 26],
  [22, 27],
  [22, 25],
  [22, 23],
  [22, 24],
  [22, 22],
  [22, 21],
  [22, 20],
  [18, 20],
  [19, 20],
  [21, 20],
  [20, 20],
  [19, 26],
  [21, 26],
  [20, 26],
  [18, 26],
  [25, 19],
  [25, 21],
  [25, 20],
  [25, 22],
  [25, 23],
  [25, 24],
  [25, 26],
  [25, 25],
  [25, 27],
  [25, 28],
  [25, 29],
  [25, 30],
  [26, 30],
  [27, 30],
  [28, 30],
  [29, 30],
  [30, 30],
  [26, 29],
  [26, 28],
  [26, 27],
  [26, 25],
  [26, 26],
  [26, 24],
  [26, 23],
  [26, 22],
  [26, 21],
  [26, 20],
  [26, 19],
  [32, 30],
  [32, 29],
  [32, 28],
  [32, 27],
  [32, 26],
  [32, 25],
  [32, 24],
  [32, 23],
  [32, 21],
  [32, 22],
  [32, 19],
  [32, 20],
  [33, 30],
  [34, 30],
  [35, 30],
  [36, 30],
  [37, 30],
  [33, 29],
  [33, 28],
  [33, 26],
  [33, 27],
  [33, 25],
  [33, 24],
  [33, 21],
  [33, 22],
  [33, 23],
  [33, 20],
  [33, 19],
  [27, 29],
  [28, 29],
  [29, 29],
  [30, 29],
  [35, 29],
  [34, 29],
  [36, 29],
  [37, 29],
  [21, 25],
  [20, 25],
  [19, 25],
  [18, 25],
];
const initMatrix = () => {
  for (let y = 0; y < ROWS; y++) {
    matrix[y] = [];
    for (let x = 0; x < COLS; x++) {
      matrix[y][x] = false;
    }
  }
};

const initScenario = () => {
  const container = document.getElementById("container");
  const scenario = document.createElement("scenario");
  scenario.id = "scenario";
  scenario.className = "scenario";
  container.appendChild(scenario);
};

const drawBlocks = () => {
  const scenario = document.getElementById("scenario");
  for (let y = 0; y < ROWS; y++) {
    const row = document.createElement("div");
    row.className = "row";
    scenario.appendChild(row);
    for (let x = 0; x < COLS; x++) {
      const block = document.createElement("div");
      block.id = `block-${x}-${y}`;
      block.className = "block";
      row.appendChild(block);
    }
  }
};

const drawImage = () => {
  const scenario = document.getElementById("scenario");
  const img = document.createElement("img");
  img.className = "nerd_hahaha";
  img.src = "https://avatars.githubusercontent.com/u/1024025?v=4";
  scenario.appendChild(img);
};

const greedyAnimation = () => {
  const keys = {};
  const selectKeyBlocks = () => {
    let quantity = 0;
    do {
      const x = Math.floor(Math.random() * COLS);
      const y = Math.floor(Math.random() * ROWS);
      if (typeof keys[x] === 'undefined') {
        keys[x] = {};
      }

      if(typeof keys[x][y] === 'undefined'){
        keys[x][y] = true;
        quantity++;
      }

    } while (quantity < arrayAll.length);
  };
  const updateNeighbor = (x, y) => {
    if (!(x < COLS && y < ROWS && x >= 0 && y >= 0)) {
      return;
    }
    if (matrix[y][x] === true) {
      return;
    }
    matrix[y][x] = true;

    const color =
      Math.random() < 0.3
        ? "#57d364"
        : Math.random() < 0.5
          ? "#033a16"
          : "#151b23";
    const block = document.getElementById(`block-${x}-${y}`).animate(
      [
        {
          opacity: 1,
          backgroundColor: color,
        },
        {
          opacity: keys[x]?.[y] ? 1 : Math.random() < 0.5 ? 0 : 0.1,
          backgroundColor: keys[x]?.[y] ? color : 'black',
        },
      ],
      {
        duration: 100,
        fill: "forwards",
      },
    );
    const positions = [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
      [x, y + 1],
      [x - 1, y + 1],
      [x - 1, y],
    ];
    const calc = () => {
      for (let index = 0; index < positions.length; index++) {
        updateNeighbor(positions[index][0], positions[index][1]);
      }

      if (Math.random() < 0.3) {
        updateNeighbor(x + 2, y + 2);
      }
      if (Math.random() < 0.3) {
        updateNeighbor(x - 2, y - 2);
      }
      if (Math.random() < 0.3) {
        updateNeighbor(x - 2, y + 2);
      }
      if (Math.random() < 0.3) {
        updateNeighbor(x + 2, y - 2);
      }
    };
    block?.addEventListener("finish", async () => {
      block?.commitStyles();
      block?.cancel();
      calc();
    });
    block?.addEventListener("cancel", () => {});
    block?.addEventListener("remove", () => {});
  };
  const showAll = () => {
    const scenario = document.getElementById("scenario");
    const arrXs = Object.keys(keys);

    let idx = 0;
    for (let i = 0; i < arrXs.length; i++) {
        const x = arrXs[i];
        const arrYs = Object.keys(keys[arrXs[i]]);
        for (let j = 0; j < arrYs.length; j++) {
          const y = arrYs[j];

          const targetX = arrayAll[idx][0] * 10;
          const targetY = arrayAll[idx][1] * 10;
          const element = document.getElementById(`block-${x}-${y}`).animate(
            [
              {
              },
              {
                backgroundColor: "#57d364",
                transform: `translate(${targetX - x * 10}px, ${targetY - y * 10}px)`,
              },
            ],
            {
                duration: 4000,
                fill: 'forwards'
            },
          );
          idx++;
        }
    }
  };
  selectKeyBlocks();
  updateNeighbor(
    Math.floor(Math.random() * COLS),
    Math.floor(Math.random() * ROWS),
  );
  setTimeout(() => {
    showAll();
  }, 5000);
};

initMatrix();
initScenario();
drawImage();
drawBlocks();
greedyAnimation();
