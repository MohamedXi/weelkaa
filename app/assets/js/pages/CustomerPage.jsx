import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import CustomerAPI from "../services/customersAPI"

const CustomersPage = (props) => {
    // Init the customer set variable
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    // Get all customers
    const fetchCustomers = async () => {
        try {
            const data = await CustomerAPI.findAll();
            setCustomers(data);
        } catch (e) {
            console.log(e.response)
        }
    };

    // Get the customers after the loading
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Delete a customer button (handle)
    const handleDelete = async (id) => {
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));
        try {
            await CustomerAPI.delete(id)
        } catch (e) {
            setCustomers(originalCustomers);
        }
    };

    // Change the page
    const handlePageChange = page => {
        setCurrentPage(page);
    };

    // Search
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1)
    };

    // Init the pagination of the customers
    const itemsPerPage = 10;

    // Filter customers
    const filteredCustomers = customers.filter(
        c =>
            c.firstName.toLowerCase().includes(search.toLowerCase()) ||
            c.lastName.toLowerCase().includes(search.toLowerCase()) ||
            c.emailAddress.toLowerCase().includes(search.toLowerCase()) ||
            (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
    );

    // Data pagination
    const paginatedCustomers = filteredCustomers.length > itemsPerPage ? Pagination.getData(
        filteredCustomers,
        currentPage,
        itemsPerPage
    ) : filteredCustomers;

    return (
        <>
            <h1>Customer list</h1>

            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control"
                       placeholder="Search"/>
            </div>

            <div className="card shadow-sm px-4 pt-3 mb-3 table-responsive-sm">
                <table className="table table-borderless">
                    <thead className="border-bottom">
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
                    {paginatedCustomers.map(customer =>
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
            </div>
            {itemsPerPage < filteredCustomers.length &&
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredCustomers.length}
                onPageChanged={handlePageChange}/>
            }
        </>
    );
};

export default CustomersPage;