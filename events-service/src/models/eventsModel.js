const { title } = require('node:process');
const db = require('../../db');

const EventsModel = {

    create: async (id, title, description, event_date, location) => {
        const [result] = await db.execute(
        'INSERT INTO events (id, title, description, event_date, location) VALUES (?, ?, ?, ?, ?)',[id, title, description, event_date, location]);

        return result.insertId;
    },

    findAll: async () =>{
        const [rows] = await db.execute(
            'SELECT * FROM events');
            return rows;
    },

    findById: async (id) =>{
        const [rows] = await db.execute(
            'SELECT * FROM events WHERE id = ?',[id]);
            return rows[0];
    },

    update: async (id, title, description, event_date, location) => {
        await db.execute(
            'UPDATE events SET  title = ?, description = ?, event_date = ?, location = ? WHERE id = ?', [title, description, event_date, location, id]
        )
    },

    delete: async (id) => {
        await db.execute('DELETE FROM events WHERE id = ?',[id]);
    }






};

module.exports = EventsModel;