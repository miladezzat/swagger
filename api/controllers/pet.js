'use strict';
// Include our "db"
var db = require('../../config/db')();


//GET /pet operationId
function getAll(req, res, next) {
    res.json({ pets: db.find() });
}

//POST /pet operationId
function save(req, res, next) {
    console.log(req.body);
    res.json({ success: db.save(req.body), description: "Pet added to the list!" });
}

function bidPet(req, res, next) {
    var id = req.swagger.params.pet_id.value; //req.swagger contains the path parameters
    const { user_id, user_name, amount_money } = req.body;
    const bid = {
        user_id,
        user_name,
        amount_money
    }
    const pet = {
        bid
    }
    res.json({ success: db.update(id, pet) })

}

//GET /pet/{id} operationId
function getOne(req, res, next) {
    var id = req.swagger.params.pet_id.value; //req.swagger contains the path parameters
    var pet = db.find(id);
    if (pet) {
        res.json(pet);
    } else {
        res.status(204).send();
    }
}



function bidWinner(req, res, next) {
    let id = req.swagger.params.pet_id.value; //req.swagger contains the path parameters
    let pet = db.find(id);
    console.log(pet);
    if (pet && !pet.bids) {
        res.status(200).json({ message: "No Winners" })
    } else {
        let sortedBidsByNames = pet.bids.sort((a, b) => (a.user_name > b.user_name) ? 1 : ((b.user_name > a.user_name) ? -1 : 0));

        let sortedBids = sortedBidsByNames.sort((a, b) => (a.amount_money < b.amount_money) ? 1 : ((b.amount_money < a.amount_money) ? -1 : 0));

        if (pet.num_avalible >= sortedBids.length) {
            res.status(200).json({
                winners: sortedBids.map(bid => ({ user: bid.user_name, paid: bid.amount_money }))
            })
        } else {
            let winners = [];

            for (let index = 0; index < pet.num_avalible; index++) {
                winners.push({
                    user: sortedBids[index].user_name,
                    paid: sortedBids[index + 1].amount_money
                })
            }

            console.log(winners);
            
            for (let index = pet.num_avalible-1 ; index < sortedBids.length; index++) {
                winners.push({
                    user: sortedBids[index].user_name,
                    paind: "Lost the auction"
                })
            }

            res.status(200).json({ winners })
        }
    }

}









// Exports all the functions to perform on the db
module.exports = { getAll, save, getOne, bidPet, bidWinner };
