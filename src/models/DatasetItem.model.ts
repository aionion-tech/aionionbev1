import sequelize from "../db/connect";
import { DataTypes, Model } from "sequelize";
import { WorkspaceModel } from "./Workspace.model";
import { ProjectModel } from "./Project.model";
import { DatasetItem } from "../interfaces/DatasetItem.interface";
import { DatasetModel } from "./Dataset.model";

class DatasetItemClass extends Model<DatasetItem> implements DatasetItem {
  public id!: number;
  public name!: string;
  public workspace!: number;
  public project!: number;
  public dataset!: number;
  public type!: string;
  public url!: string;
  public value!: string;
  public annotations!: string; //jsonb

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const DatasetItemModel = DatasetItemClass.init(
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
    dataset: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DatasetModel,
        key: "id",
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    annotations: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  { tableName: "datasetItems", sequelize }
);

export { DatasetItemModel };
