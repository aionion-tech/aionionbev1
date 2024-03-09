import sequelize from "../db/connect";
import { DataTypes, Model } from "sequelize";
import { DatasetSettings } from "../interfaces/DatasetSettings.interface";
import { DatasetModel } from "./Dataset.model";

class DatasetSettingsClass
  extends Model<DatasetSettings>
  implements DatasetSettings
{
  public id!: number;
  public dataset!: number;
  public ontology!: string; //jsonb

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const DatasetSettingsModel = DatasetSettingsClass.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dataset: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DatasetModel,
        key: "id",
      },
    },
    ontology: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  { tableName: "dataset_settings", sequelize }
);

export { DatasetSettingsModel };
