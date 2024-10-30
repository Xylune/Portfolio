import db from "./db";

const resetProjectsTable = () => {
  db.exec(`
    DELETE FROM projects;
  `);
  console.log("Projects table has been reset.");
};

resetProjectsTable();