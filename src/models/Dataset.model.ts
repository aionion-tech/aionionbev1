import sequelize from "../db/connect";
import { DataTypes, Model } from "sequelize";
import { WorkspaceModel } from "./Workspace.model";
import { Dataset } from "../interfaces/Dataset.interface";
import { ProjectModel } from "./Project.model";

class DatasetClass extends Model<Dataset> implements Dataset {
  public id!: number;
  public name!: string;
  public workspace!: number;
  public project!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const DatasetModel = DatasetClass.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workspace: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: WorkspaceModel,
        key: "id",
      },
    },
    project: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProjectModel,
        key: "id",
      },
    },
  },
  { tableName: "datasets", sequelize }
);

export { DatasetModel };
