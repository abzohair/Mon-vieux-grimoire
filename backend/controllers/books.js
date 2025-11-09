const fs = require('fs');

const Book = require('../models/Book');

exports.createBook = async (req, res, next) => {
    try {
        if (!req.body.book) return res.status(400).json({ message: 'Un champs est manquant dans le formaulaire !' });
        if (!req.file) return res.status(400).json({ message: 'Le fichier image est manquant !' });

        const objectBook = await JSON.parse(req.body.book);
        delete objectBook._id;
        delete objectBook._userId;
        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

        const book = new Book({
            ...objectBook,
            userId: req.auth.userId,
            imageUrl: imageUrl,
            ratings: [],
            averageRating: 0
        });

        await book.save();
        res.status(201).json({ message: 'Objet ajouté avec succé !' });


    } catch (error) {
        const status = error.name === 'ValidationError' ? 400 : 500;
        res.status(status).json({ error });
        console.log(error);
    }
};

exports.modifyBook = async (req, res, next) => {
    try {
        const book = await Book.findOne({ _id: req.params.id })

        if (!book) return res.status(404).json({ message: 'Livre non trouvé' });
        if (book.userId != req.auth.userId) return res.status(401).json({ message: 'Non autorisé !' });

        let objectBook = req.file ?
            {
                ...JSON.parse(req.body.book),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ...req.body }
        if (req.file) {
            const filename = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, (err) => {
                if (err) console.log('Erreur suppression ancienne image:', err);
            });
        };
        delete objectBook._userId;

        await Book.updateOne({ _id: req.params.id }, { ...objectBook, _id: req.params.id });
        res.status(200).json({ message: 'Modification avec succé !' });

    } catch (error) {
        const status = error.name === 'ValidationError' ? 400 : 500;
        res.status(status).json({ error });
        console.log(error);
    }
};

exports.deleteOneBook = async (req, res, next) => {
    try {
        const book = await Book.findOne({ _id: req.params.id });
        if (!book) return res.status(404).json({ message: 'Livre non trouvé !' });
        if (book.userId != req.auth.userId) return res.status(401).json({ message: 'Non autorisé !' });

        const filename = book.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, async () => {
            await book.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Objet supprimé !' });
            console.log({ _id: req.params.id }, 'Objet supprimé !');
        });
    } catch (error) {
        const status = error.name === 'ValidationError' ? 400 : 500;
        res.status(status).json({ error });
        console.log(error);
    }
};

exports.addRating = async (req, res, next) => {
    try {
        if (req.body.rating < 0 || req.body.rating > 5) return res.status(400).json({ message: 'La note doit être entre 0 et 5 !' });

        const book = await Book.findOne({ _id: req.params.id });

        const existingRating = book.ratings.some(item => item.userId.toString() === req.auth.userId);
        if (existingRating) return res.status(400).json({ message: 'Vous avez déjà noté ce livre !' });
        book.ratings.push({ userId: req.auth.userId, grade: req.body.rating });

        const totalRatings = book.ratings.length;
        const sumRatings = book.ratings.reduce((intVal, rating) => intVal + rating.grade, 0);
        book.averageRating = (sumRatings / totalRatings).toFixed(1);

        await book.save();
        res.status(200).json(book);

    } catch (error) {
        const status = error.name === 'ValidationError' ? 400 : 500;
        res.status(status).json({ error });
        console.log(error);
    }
};

exports.getBestRating = async (req, res, next) => {
    try {
        const bestBooks = await Book.find().sort({ averageRating: -1 }).limit(3);
        res.status(200).json(bestBooks);
    } catch (error) {
        const status = error.name === 'ValidationError' ? 400 : 500;
        res.status(status).json({ error });
        console.log(error);
    }
};

exports.getOneBook = async (req, res, next) => {
    try {
        const book = await Book.findOne({ _id: req.params.id });
        res.status(200).json(book);
    } catch (error) {
        const status = error.name === 'ValidationError' ? 400 : 500;
        res.status(status).json({ error });
        console.log(error);
    }
};

exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        const status = error.name === 'ValidationError' ? 400 : 500;
        res.status(status).json({ error });
        console.log(error);
    }
};