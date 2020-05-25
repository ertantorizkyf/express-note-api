const { 
    insert, 
    getAll, 
    getById, 
    updateById, 
    deleteById 
} = require('../services/note');

const Joi = require('joi');

// Validate request body
function noteValidation(note) {
    const schema = {
        title: Joi.string().required(),
        body: Joi.string().required()
    };

    return Joi.validate(note, schema);
}

module.exports = {
    insertNote: (req, res) => {
        const body = req.body;
        const { error } = noteValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        insert(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'error while connecting to database'
                });
            }
            return res.status(201).json({
                success: 1,
                message: 'insert success',
                data: {
                    id: results.insertId,
                    title: body.title,
                    body: body.body
                }
            })
        });
    },
    getNoteById: (req, res) => {
        const id = req.params.id;
        getById(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'error while connecting to database'
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: `no note with id ${id} exist`
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getAllNotes: (req, res) => {
        getAll((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'error while connecting to database'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateNote: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        const { error } = noteValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        getById(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'error while connecting to database'
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: `no note with id ${id} exist`
                });
            }
            updateById(id, body, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: 'error while connecting to database'
                    });
                }
                return res.json({
                    success: 1,
                    message: 'update success',
                    data: {
                        id: id,
                        title: body.title,
                        body: body.body
                    }
                })
            });
        });
    },
    deleteNote: (req, res) => {
        const id = req.params.id;
        getById(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'error while connecting to database'
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: `no note with id ${id} exist`
                });
            }
            deleteById(id, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: 'error while connecting to database'
                    });
                }
                return res.json({
                    success: 1,
                    message: 'delete success'
                });
            });
        });
    }
}
