import sequelize from "../db/connect";
import { DataTypes, Model } from "sequelize";
import { Workspace } from "../interfaces/Workspace.interface";
import { UserModel } from "./User.model";

class WorkspaceClass extends Model<Workspace> implements Workspace {
  public id!: number;
  public name!: string;
  public owner!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const WorkspaceModel = WorkspaceClass.init(
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
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
  },
  { tableName: "workspaces", sequelize }
);

export { WorkspaceModel };
