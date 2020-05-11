'use strict;'
//Include uuid to generate the pet id
const { v4: uuidv4 } = require('uuid');

module.exports = function () {
    return {
        petsList: [],
        /*
         * Save the pet inside the "db".
         */
        save(pet = {}) {
            pet.id = uuidv4(); // fast enough for our purpose
            this.petsList.push(pet);
            return pet;
        },
        /*
         * Retrieve a pet with a given id or return all the pets if the id is undefined.
         */
        find(id) {
            if (id) {
                return this.petsList.find(element => {
                    return element.id === id;
                });
            } else {
                return this.petsList;
            }
        },
        /*
         * Update a pet with the given id
         */
        update(id, pet) {
            var petIndex = this.petsList.findIndex(element => {
                return element.id === id;
            });
            if (petIndex !== -1) {
                if (pet.bid) {
                    let allBids = this.petsList[petIndex].bids
                    if (allBids) {
                        allBids = allBids.filter(bid => bid.user_id !== pet.bid.user_id)
                        allBids.push(pet.bid)
                        this.petsList[petIndex].bids = allBids;
                    } else {
                        this.petsList[petIndex].bids = [pet.bid]
                    }
                }
                return 1;
            } else {
                return 0;
            }
        }
    }
};  