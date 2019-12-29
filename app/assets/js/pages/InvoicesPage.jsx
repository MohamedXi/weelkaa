import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import InvoicesAPI from "../services/invoicesAPI";
import moment from "moment";

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
};

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
};

const InvoicesPage = props => {

    // Init the invoices set variable
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    // Init the pagination of the invoices
    const itemsPerPage = 10;

    // Get all invoices
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll();
            setInvoices(data);
        } catch (e) {
            console.log(e.response)
        }
    };

    // Get the invoices after the loading
    useEffect(() => {
        fetchInvoices();
    }, []);

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // Delete a invoices button (handle)
    const handleDelete = async (id) => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try {
            await InvoicesAPI.delete(id)
        } catch (e) {
            setInvoices(originalInvoices);
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

    // Filter invoices
    const filteredInvoices = invoices.filter(
        i =>
            i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
            i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
            i.amount.toString().toLowerCase().startsWith(search.toLowerCase()) ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    );

    // Data pagination
    const paginatedInvoices = filteredInvoices.length > itemsPerPage ? Pagination.getData(
        filteredInvoices,
        currentPage,
        itemsPerPage
    ) : filteredInvoices;


    return (
        <>
            <h1>Invoices list</h1>

            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control"
                       placeholder="Search"/>
            </div>

            <div className="card shadow-sm px-4 pt-3 mb-3 table-responsive-sm">
                <table className="table table-borderless">
                    <thead className="border-bottom">
                    <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Date</th>
                        <th className="text-center" scope="col">Status</th>
                        <th scope="col">Amount</th>
                        <th className="text-center" scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedInvoices.map(
                        invoice =>
                            <tr align="middle" key={invoice.id}>
                                <td scope="row" className="text-left">{invoice.chrono}</td>
                                <td className="text-left">
                                    <a href="#">{invoice.customer.firstName} {invoice.customer.lastName}</a>
                                </td>
                                <td scope="row" className="text-left">{formatDate(invoice.sentAt)}</td>
                                <td className="text-center">
                                    <span className={"btn btn-sm btn-" + STATUS_CLASSES[invoice.status]}>
                                        {STATUS_LABELS[invoice.status]}
                                    </span>
                                </td>
                                <td className="text-left">{invoice.amount.toLocaleString()}€</td>
                                <td className="text-center">
                                    <button className="btn btn-sm btn-light text-center mr-2">
                                        <i className="fal fa-pen"> </i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger text-center"
                                        onClick={() => handleDelete(invoice.id)}
                                        disabled={invoice.amount.length > 0}
                                    >
                                        <i className="fal fa-trash-alt"> </i>
                                    </button>
                                </td>
                            </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredInvoices.length}
                onPageChanged={handlePageChange}
            />
        </>
    )
};

export default InvoicesPage;