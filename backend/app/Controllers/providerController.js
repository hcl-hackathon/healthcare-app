const Provider = require('../Models/Provider')


const providerController = {}


providerController.dashboardDetails = (req, res) => {
    const id = req.params.id
    console.log(id, 'id check')
    Provider.findById(id)
    .then((provider) => {
        console.log(provider, 'response')
        res.json(provider)
    })
    .catch((err) => {
        res.json(err)
    })

}

providerController.details = (req, res) => {
    const body = req.body
    const id = req.user._id
    Provider.findOneAndUpdate({ _id: id}, body, { new: true, runValidators: true })
    .then((provider) => {
        res.json(provider)
    })
    .catch((err) => {
        res.json(err)
    })

}


module.exports = providerController