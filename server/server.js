const config = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize')
const path = require('path')
const Op = Sequelize.Op
const cors = require('cors')
let sequelize

if (process.env.MODE === 'development') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'sample.db',
        define: {
            timestamps: false
        }
    })
} else {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
}

const Movie = sequelize.define('movie', {
    title:{
        type: DataTypes.STRING,     
        validate: {
            len: [3, 100]
        }
    },
    category:{
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['Comedy', 'Action', 'Horror', 'Drama']
    },
    publicationDate:{
        type: DataTypes.DATEONLY,
        allowNull: false
    }
})

const CrewMember = sequelize.define('crewmember', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate :{
            len: [5,200]
        }
    },
    role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["DIRECTOR","PRODUCER","ACTOR"]
    }
})

Movie.hasMany(CrewMember)

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')))

app.get('/sync', async(req, res) => {
    try {
        await sequelize.sync({ force: true })
        res.status(201).json({ message: 'created' })
    } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.get('/movies', async(req, res) => {
    try {
        const query = {}
        let pageSize = 2
        const allowedFilters = ['title' ,'category', 'publicationDate']
        const filterKeys = Object.keys(req.query).filter(e => allowedFilters.indexOf(e) !== -1)
        if (filterKeys.length > 0) {
            query.where = {}
            for (const key of filterKeys) {
                query.where[key] = {
                    [Op.like]: `%${req.query[key]}%`
                }
            }
        }

        const sortField = req.query.sortField
        let sortOrder = 'ASC'
        if (req.query.sortOrder && req.query.sortOrder === '-1') {
            sortOrder = 'DESC'
        }

        if (req.query.pageSize) {
            pageSize = parseInt(req.query.pageSize)
        }

        if (sortField) {
            query.order = [
                [sortField, sortOrder]
            ]
        }

        if (!isNaN(parseInt(req.query.page))) {
            query.limit = pageSize
            query.offset = pageSize * parseInt(req.query.page)
        }

        const records = await Movie.findAll(query)
        const count = await Movie.count()
        res.status(200).json({ records, count })
    } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.post('/movies', async(req, res) => {
    try {
        if (req.query.bulk && req.query.bulk === 'on') {
            await Movie.bulkCreate(req.body)
            res.status(201).json({ message: 'created' })
        } else {
            await Movie.create(req.body)
            res.status(201).json({ message: 'created' })
        }
    } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.get('/movies/:id', async(req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id)
        if (movie) {
            res.status(200).json(movie)
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.put('/movies/:id', async(req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id)
        if (movie) {
            await movie.update(req.body, { fields: ['title', 'category', 'publicationDate'] })
            res.status(202).json({ message: 'accepted' })
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.delete('/movies/:id', async(req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id, { include: CrewMember })
        if (movie) {
            await movie.destroy()
            res.status(202).json({ message: 'accepted' })
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})



app.get('/movies/:mid/crewmembers', async(req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if (movie) {
            const crewmembers = await movie.getCrewmembers()

            res.status(200).json(crewmembers)
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.get('/movies/:mid/crewmembers/:cid', async(req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if (movie) {
            const crewmembers = await movie.getCrewmembers({ where: { id: req.params.cid } })
            res.status(200).json(crewmembers.shift())
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.post('/movies/:mid/crewmembers', async(req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if (movie) {
            const crewmember = req.body
            crewmember.movieId = movie.id
            console.warn(crewmember)
            await CrewMember.create(crewmember)
            res.status(201).json({ message: 'created' })
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.put('/movies/:mid/crewmembers/:cid', async(req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if (movie) {
            const crewmembers = await movie.getCrewmembers({ where: { id: req.params.cid } })
            const crewmember = crewmembers.shift()
            if (crewmember) {
                await crewmember.update(req.body)
                res.status(202).json({ message: 'accepted' })
            } else {
                res.status(404).json({ message: 'not found' })
            }
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.delete('/movies/:mid/crewmembers/:cid', async(req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if (movie) {
            const crewmembers = await movie.getCrewmembers({ where: { id: req.params.cid } })
            const crewmember = crewmembers.shift()
            if (crewmember) {
                await crewmember.destroy(req.body)
                res.status(202).json({ message: 'accepted' })
            } else {
                res.status(404).json({ message: 'not found' })
            }
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.listen(process.env.PORT, async() => {
    await sequelize.sync({ alter: true })
})