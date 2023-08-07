const noteModel = require('../models/Notes');
const userModel = require('../models/User');

exports.createNote = (req, res) => {
    const { title, description, date } = req.body;
    if (!title, !description) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    const note = new noteModel({ title, description, date, user: req.user })
    note.save().then(result => {
        res.json({ note: result })
    })
        .catch(error => {
            console.log(error);
        })
}


exports.myNotes = async (req, res) => {
    noteModel.find({ user: req.user })
        .populate("user", "id name")
        .then(notes => {
            res.json({ notes })
        })
        .catch(error => {
            console.log(error);
        })
}

exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const note = await noteModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return res.status(200).send({
            success: true,
            message: "note updated",
            note
        })
    } catch (error) {
        console.log(error);
    }
}

exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    const note = await noteModel.findByIdAndDelete(id)
    if (!note) {
        res.status(404).json({ error: "post not fount" })
    }
    return res.json({ message: "note deleted", note })
}

exports.activepost = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const task = await noteModel.findByIdAndUpdate(id, { completed: true }, { new: true })
    console.log(task);
    return res.json(task)

}
exports.unactivepost = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const task = await noteModel.findByIdAndUpdate(id, { completed: false }, { new: true })
    console.log(task);
    return res.json(task)

}
exports.getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await noteModel.findById(id);
        if (!note) {
            return res.status(404).send({
                success: false,
                message: "blog not found with this is",
            });
        }
        return res.status(200).send({
            success: true,
            message: "fetch single blog",
            note,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error while getting single blog",
            error,
        });
    }
}

