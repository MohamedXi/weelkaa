import axios from 'axios';

function findAll() {
    return axios
        .get("http://localhost:9000/api/customers")
        .then(response => response.data["hydra:member"]);
}

function deleteCustomer(id) {
    return axios.delete("http://localhost:9000/api/customers/" + id);
}

export default {
    findAll: findAll,
    delete: deleteCustomer
};