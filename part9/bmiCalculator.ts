interface Values {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): Values => {
  if (args.length < 4) throw new Error("Not enough");
  if (args.length > 4) throw new Error("Too many");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

function calculateBmi (a: number, b: number) {
  const result = b / Math.pow((a / 100), 2);
  // return `Normal ${result}`
  console.log(`${result}`);
  return result;
}

// const a: number = Number(process.argv[3])
// const b: number = Number(process.argv[4])
// console.log(calculateBmi(180, 74))

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(process.argv);
  calculateBmi(value1, value2);
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log("Error", e.message);
}

export { calculateBmi };
