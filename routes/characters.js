const express = require('express');
const mongoose = require('mongoose');

const router = express();

mongoose.connect('mongodb://localhost/breakingbad', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(err => console.log('Error ',err));

const mongoSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    job: {
        required: true,
        type: [String]
    }
})

const Characters = mongoose.model('character', mongoSchema);

router.get('/dummyapi', (req, res) => {
    res.status(200).send({
        StatusCode: "400",
        ErrorCode: "Failed to fetch data due to invalid parameters"
    })
})

router.get('/', (req,res) => {
    async function getCharacters() {
        const chars = await Characters.find();
        res.send(chars);
    }
    try {
        getCharacters();
    } catch(err) {
        console.log(err)
    }
})

router.get('/:id', (req,res) => {
    async function getCharacters() {
        const chars = await Characters.findById(req.params.id);
        res.send(chars);    
        try {
            await chars.validate();   
        } catch(err) {
            console.log(err.message);
        }
    }
getCharacters();
})

router.put('/:id', (req,res) => {
    async function updateCharacters() {
        const chars = await Characters.findById(req.params.id);
        if(!chars) return;
        chars.set({
            name: req.body.name,
            job: req.body.job
        });
        res.send(chars);
        chars.save();
    }
    updateCharacters();
})

router.post('/',(req,res) => {
    async function addCharacters() {
        const char = new Characters({
            name: req.body.name,
            job: req.body.job
        })
        char.save();
        console.log(char);
        res.send(char)
    }
    addCharacters();
});

router.delete('/:id', (req, res) => {
    async function deleteCharacters() {
        const deletedCharacter = await Characters.findByIdAndDelete(req.params.id);

        if(!deleteCharacters) return;
        console.log(deletedCharacter);
        res.send(deletedCharacter);
    }
    deleteCharacters();
})


module.exports = router;