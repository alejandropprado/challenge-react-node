import { AppDataSource } from "./data-source";
(async () => {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
  await AppDataSource.destroy();
  console.log("Migrations applied");
})();
