var mysql = require("mysql2/promise");
const dbInfo = require("../config/database.json");

module.exports = {
  select: async (table, params) => {
    const con = await mysql.createConnection(dbInfo);

    var sql = "SELECT * FROM " + table + " WHERE 1 = 1";
    for (var i in params) sql += " AND " + i + " = ?";

    let [rows] = await con.query(sql, Object.values(params));
    if (rows == null || rows == undefined) return { status: "failed" };
    else return { status: "success", data: rows };
  },
  selectMissed: async (table, params) => {
    const con = await mysql.createConnection(dbInfo);

    var sql =
      "SELECT tToken, tChainId, SUM(amount) as amount FROM " +
      table +
      " WHERE 1 = 1";
    for (var i in params) sql += " AND " + i + " = ?";
    sql += " AND status = 2 GROUP BY tToken, tChainID";
    let [rows] = await con.query(sql, Object.values(params));
    if (rows == null || rows == undefined) return { status: "failed" };
    else return { status: "success", data: rows };
  },
  insertTransaction: async (params) => {
    const con = await mysql.createConnection(dbInfo);
    var sql =
      "INSERT INTO transactions (fToken, fAddress, tAddress, amount, fChainID, tChainID, fTxnID, form) VALUES ?";
    let res = await con.query(sql, [params]);

    if (res[0].insertId !== undefined)
      return { status: "success", uID: res[0].insertId };
    else return { status: "failed" };
  },
  updateTransaction: async (uID, params) => {
    const con = await mysql.createConnection(dbInfo);
    var sql = "UPDATE transactions SET uid = " + uID;

    for (var i in params) sql += ", " + i + " = '" + params[i] + "'";
    sql += " WHERE uid = " + uID;

    let res = await con.query(sql);
    console.log(res);
    if (res[0].insertId !== undefined)
      return { status: "success", uID: res[0].insertId };
    else return { status: "failed" };
  },
};
