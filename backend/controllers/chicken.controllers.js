const ChickenModel = require('../models/chicken.model');

module.exports.getChicken = async (req, res) => {
    const chicken = await ChickenModel.find();
    res.status(200).json(chicken);
};

module.exports.setChicken = async (req, res) => {
    if (!req.body.name) {
        res.status(400).json({name: "A name is needed"});
        return ;
    }
    if (!req.body.weight) {
        res.status(400).json({weight: "A weight is needed"});
        return ;
    }

    // await car on a besoin d'envoyer des choses a la db
    const chicken = await ChickenModel.create({
        name: req.body.name,
        birthday: Date.parse(req.body.birthday),
        weight: req.body.weight,
    });
    res.status(200).json(chicken);
};

module.exports.editChicken = async (req, res) => {
    const chicken = await ChickenModel.findById(req.params.id);

    if (!chicken) {
        res.status(400).json({name: "This chicken doesn't exist"});
    }

    const updateChicken = await ChickenModel.findByIdAndUpdate(
        chicken, 
        req.body,
        { new: true },
    );

    res.status(200).json(updateChicken);
};

module.exports.deleteChicken = async (req, res) => {
    const chicken = await ChickenModel.findById(req.params.id);

    if (!chicken) {
        res.status(400).json({name: "This chicken doesn't exist"});
    }

    // remove deprecated ?
    await chicken.deleteOne();
    res.status(200).json("Chicken deleted: " + req.params.id);
}

module.exports.runChicken = async (req, res) => {
    try {
        await ChickenModel.findByIdAndUpdate(
            req.params.id,
            // isRunning -> true
            { isRunning: true },
            { new: true }
            ).then((data) => { ChickenModel.findByIdAndUpdate(
                req.params.id,
                // incrementer steps de 1
                { steps: data.steps + 1 },
                { new: true }
                ).then((data) => { ChickenModel.findByIdAndUpdate(
                    req.params.id,
                    // isRunning -> false
                    { isRunning: false },
                    { new: true }
                    ).then((data) => res.status(200).send(data))})});
    } catch (err) {
        res.status(400).json(err);
    }
}
