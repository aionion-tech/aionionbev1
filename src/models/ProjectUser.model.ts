import sequelize from "../db/connect";
import { DataTypes, Model } from "sequelize";
import { WorkspaceModel } from "./Workspace.model";
import { UserModel } from "./User.model";
import { ProjectUser } from "../interfaces/ProjectUser.interface";
import { ProjectModel } from "./Project.model";

class ProjectUserClass extends Model<ProjectUser> implements ProjectUser {
  public id!: number;
  public workspace!: number;
  public project!: number;
  public user!: number;
  public role!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public comparePassword!: (password: string) => Promise<boolean>;
}

const ProjectUserModel = ProjectUserClass.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "project_users", sequelize }
);

export { ProjectUserModel };
