const sqlParameter = (x: number | string | boolean) => {
  const type = typeof x;

  switch (type) {
    case "string": {
      return `"${x}"`;
    }
    default: {
      return x.toString();
    }
  }
};

export const forTable = (tableName: string) => {
  const UPDATE = <T extends object>(payload: T, where: string[]) => {
    return `UPDATE ${tableName} SET ${Object.keys(payload)
      // @ts-ignore
      .map((x) => `${x} = ${sqlParameter(payload[x])}`)
      .join(", ")} WHERE ${where.join(" AND ")}`;
  };

  const DELETE = (where: string[]) => {
    return `DELETE ${tableName}${
      where.length ? ` WHERE ${where.join(" AND ")}` : ""
    }`;
  };

  const SELECT = (where: string[]) => {
    return `SELECT * FROM ${tableName}${
      where.length ? ` WHERE ${where.join(" AND ")}` : ""
    }`;
  };

  const INSERT = <T extends object>(payload: T[]) => {
    const keys = Object.keys(payload[0]);
    return `INSERT INTO ${tableName} (${keys.join(", ")}) VALUES ${payload
      .map(
        (item) =>
          `(${Object.values(item)
            .map((value) => `${sqlParameter(value)}`)
            .join(", ")})`
      )
      .join(", ")}`;
  };

  return { UPDATE, DELETE, SELECT, INSERT };
};
