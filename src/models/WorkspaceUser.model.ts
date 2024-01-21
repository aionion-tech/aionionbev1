import sequelize from "../db/connect";
import { DataTypes, Model } from "sequelize";
import { WorkspaceUser } from "../interfaces/WorkspaceUser.interface";
import { WorkspaceModel } from "./Workspace.model";
import { UserModel } from "./User.model";

class WorkspaceUserClass extends Model<WorkspaceUser> implements WorkspaceUser {
  public id!: number;
  public workspace!: number;
  public user!: number;
  public role!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public comparePassword!: (password: string) => Promise<boolean>;
}

const WorkspaceUserModel = WorkspaceUserClass.init(
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
  { tableName: "workspace_users", sequelize }
);

export { WorkspaceUserModel };
