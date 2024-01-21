import sequelize from "../db/connect";
import { DataTypes, Model } from "sequelize";
import { Project } from "../interfaces/Project.interface";
import { WorkspaceModel } from "./Workspace.model";

class ProjectClass extends Model<Project> implements Project {
  public id!: number;
  public name!: string;
  public workspace!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const ProjectModel = ProjectClass.init(
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
  },
  { tableName: "projects", sequelize }
);

export { ProjectModel };
