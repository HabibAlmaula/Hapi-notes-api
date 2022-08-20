const {nanoid} = require("nanoid");
const notes = require("./notes");
const addNotedHandler = (request, h) => {
    const {title, tags, body} = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    notes.push({
        id,
        title,
        tags,
        body,
        createdAt,
        updatedAt
    });

    const isSuccess = notes.filter(note => note.id === id).length > 0;
    if (isSuccess) {
        return h.response({
            status: "success",
            statusCode: 201,
            message: "Catatan berhasil ditambahkan",
            data: {
                noteId: id,
            }
        });
    } else {
        return h.response({
            status: 'fail',
            statusCode: 500,
            message: "Gagal menambahkan catatan",
        });
    }
}

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (request, h) => {
    const {id} = request.params;
    const note = notes.find(note => note.id === id);
    if (note) {
        return h.response({
            status: 'success',
            data: {
                note,
            },
        });
    } else {
        return h.response({
            status: 'fail',
            statusCode: 404,
            message: "Catatan tidak ditemukan",
        });
    }
};
const editNoteByIdHandler = (request, h) => {
    const {id} = request.params;
    const {title, tags, body} = request.payload;
    const note = notes.find(note => note.id === id);
    if (note) {
        note.title = title;
        note.tags = tags;
        note.body = body;
        note.updatedAt = new Date().toISOString();
        return h.response({
            status: 'success',
            data: {
                note,
            },
        });
    } else {
        return h.response({
            status: 'fail',
            statusCode: 404,
            message: "Catatan tidak ditemukan",
        });
    }
};

const deleteNoteByIdHandler = (request, h) => {
    const {id} = request.params;
    const note = notes.find(note => note.id === id);
    if (note) {
        notes.splice(notes.indexOf(note), 1);
        return h.response({
            status: 'success',
            data: {
                note,
            },
        });
    } else {
        return h.response({
            status: 'fail',
            statusCode: 404,
            message: "Catatan tidak ditemukan",
        });
    }
}


module.exports = {addNotedHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler};