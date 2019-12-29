import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from "../components/Pagination";

const CustomersPageWithPagination = (props) => {
    // Init the customer set variable
    const [customers, setCustomers] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    // Init the pagination of the customers
    const itemsPerPage = 10;

    // Call the API of the customer list
    useEffect(() => {
        axios
            .get(`http://localhost:9000/api/customers?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
            .then(response => {
                setCustomers(response.data["hydra:member"]);
                setTotalItems(response.data["hydra:totalItems"]);
                setLoading(false)
            })
            .catch(error => console.log(error.response))
            ;
    }, [currentPage]);

    // Delete a customer button
    const handleDelete = (id) => {
        const originalCustomers = [...customers];

        setCustomers(customers.filter(customer => customer.id !== id));

        axios
            .delete("http://localhost:9000/api/customerds/" + id)
            .then(response => console.log("Ok"))
            .catch(error => {
                setCustomers(originalCustomers);
                console.log(error.response);
            });
    };

    // Change the page
    const handlePageChange = page => {
        setCurrentPage(page);
        setLoading(true);
    };

    const paginatedCustomers = Pagination.getData(customers, currentPage, itemsPerPage);

    return (
        <>
            <h1>Customer list (Pagination)</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Email address</th>
                        <th scope="col">Enterprise</th>
                        <th scope="col" className="text-center">Invoice</th>
                        <th scope="col" className="text-center">Total amount</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && <tr><td>Loading…</td></tr>}
                    {!loading && customers.map(customer =>
                        <tr align="middle" key={customer.id}>
                            <th scope="row" className="text-left">{customer.id}</th>
                            <td className="text-left">
                                <a href="#">{customer.firstName} {customer.lastName}</a>
                            </td>
                            <td className="text-left">{customer.emailAddress}</td>
                            <td className="text-left">{customer.company}</td>
                            <td className="text-center">
                                <span className="btn btn-sm btn-primary">
                                    <span className="badge badge-light">{customer.invoices.length}</span> Invoices
                        </span>
                            </td>
                            <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(customer.id)}
                                    disabled={customer.invoices.length > 0}
                                    className="btn btn-sm btn-danger">Delete
                            </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={totalItems}
                onPageChanged={handlePageChange} />
        </>
    );
};

export default CustomersPageWithPagination;