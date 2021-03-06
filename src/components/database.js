import mysql from "mysql";

export const createConnection = () => {
    const {
        DB_HOST: host,
        DB_USERNAME: user,
        DB_PASSWORD: password,
        DB_DATABASE: database
    } = process.env;

    return mysql.createConnection({ host, user, password, database });
};
export const executeSQL = sql => {
    const connection = createConnection();
    connection.connect();

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, rows) => {
            if(err) {
                reject(err);
            } else {
                resolve(rows);
            }

            connection.end();
        });
    });
};

export const getStampRatio = id =>{
    const SQL = `SELECT DISTINCT beacon_id from member_stamp WHERE member_id = ${id}`;
    return executeSQL(SQL);
}

export const getBeaconCnt = _ => {
    const SQL = `SELECT COUNT(*) as cnt FROM beacon`;
    return executeSQL(SQL);
}

export const getAllRouteInfo = _ => {
    const SQL = `SELECT * FROM route WHERE 1`;
    return executeSQL(SQL);
};
export const getRouteInfo = id => {
    const SQL = `SELECT * FROM route WHERE id = ${id}`;
    return executeSQL(SQL);
};
export const getBeaconListInRoute = id => {
    const SQL = `SELECT b.* FROM route_beacon AS r LEFT JOIN beacon AS b ON r.beacon_id = b.id WHERE r.route_id = ${id} ORDER BY r.sequence ASC`;
    return executeSQL(SQL);
}

export const getBeaconList = _ => {
    const SQL = `SELECT * FROM beacon WHERE 1`;
    return executeSQL(SQL);
};
export const getBeaconInfo = id => {
    const SQL = `SELECT * FROM beacon WHERE id = ${id}`;
    return executeSQL(SQL);
}
export const getBeaconImageInfo = id => {
    const SQL = `SELECT image_id FROM beacon_image WHERE beacon_id = ${id}`;
    return executeSQL(SQL);
}

export const insertImage = ({ originalname, mimetype, path }) => {
    const SQL = `INSERT INTO image (title, mimetype, path) VALUE ('${originalname}', '${mimetype}', '${path}')`;
    return executeSQL(SQL);
}
export const getAllImageInfo = _ => {
    const SQL = `SELECT * FROM image WHERE 1`;
    return executeSQL(SQL);
};
export const getImageInfo = id => {
    const SQL = `SELECT * FROM image WHERE id = ${id}`;
    return executeSQL(SQL);
}

export const updateUserLastRoute = (user_id, route_id) => {
    const SQL = `UPDATE member SET last_route = ${route_id} WHERE id = ${user_id}`;
    return executeSQL(SQL);
}
export const getImagePaths = _ => {
    const SQL = `SELECT * FROM image`;
    return executeSQL(SQL);
}
export const getStampStatus = ({ member_id,route_id,beacon_id }) => {
    const SQL = `INSERT INTO member_stamp (member_id,route_id,beacon_id) VALUE ('${member_id}', '${route_id}', '${beacon_id}')`;
    return executeSQL(SQL);
}

