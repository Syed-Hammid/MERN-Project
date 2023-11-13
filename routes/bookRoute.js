import express from 'express';
import { Book } from '../models/bookmodel.js';

const router = express.Router();
// Creating Books API

router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).json({ msg: "Please fill all fields" });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    }
    catch (error) {
        console.log(error);
        req.status(500).send({ message: error.message })
    }
})

//Getting Books API

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        res.status(200).send({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
})


//Getting one book by ID

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        res.status(200).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
})


//Updating Books by ID

router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).json({ msg: "Please fill all fields" });
        }
        const id = req.params.id;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: "Book not Found" });
        }
        return res.status(200).send({ message: "Book updated successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

)

//Deleting Book by ID

router.delete('/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Book not Found" });
        }
        return res.status(200).send({ message: "Book deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

)

export default router;