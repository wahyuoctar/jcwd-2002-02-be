const { DataTypes } = require("sequelize");

const Alamat = (sequelize) => {
  return sequelize.define("address", {
    label_alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_penerima: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_telepon_penerima: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_lengkap: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provinsi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provinsi_id: {
      type: DataTypes.INTEGER,
    },
    kota_kabupaten: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kota_id: {
      type: DataTypes.INTEGER,
    },
    kecamatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kode_pos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_main_address: {
      type: DataTypes.BOOLEAN,
    },
  });
};

module.exports = Alamat;
