
const { message } = require('statuses');
const EventsModel = require('../models/eventsModel');
const { error } = require('node:console');

const EventsController = {

    createEvent: async (req, res) =>{
        const{id, title, description, event_date, location } = req.body;
        try{
            const eventId = await EventsModel.create(title,description, event_date, location);
            res.status(201).json({'evento criado!': eventId});
        }
        catch(error){
            res.status(500).json({erro: error.message});

        }
    },

    getAllEvents: async (req, res) => {
        try{
            const events = await EventsModel.findAll();
            res.json(events);
        }
        catch(error){
            res.status(500).json({"error": error.message})
        }
    },

    getEventById: async (req,res) =>{
        const {id} = req.params;
        try{
            const events = await EventsModel.findById(id);
            if(!events) return res.status(404).json({erro: "Usuário não encontrado"})
            res.json(events);
        }
        catch(error){
            res.status(500).json({"error": error.message});
        }

    },

    updateEvent: async (req, res) => {
        const {id, title, description, event_date, location} = req.body;
        if(!id) return res.status(400).json({erro: "Id obrigatório no JSON"});
        try{
            await EventsModel.update(id, title, description, event_date, location);
            res.json({ message: "Evento modificado com sucesso!"});
        }
        catch(error){
            res.status(500).json({"error": error.message});
        }
    },

    deleteEvent: async(req, res) => {
        const {id} = req.params;
        if(!id) return res.status(400).json({"error": error.message});
        try{
            await EventsModel.delete(id);
            res.json({message: "Evento deletado com sucesso!"});
        }
        catch{
            res.status(500).json({"error": error.message});
        }
    }
};

module.exports = EventsController;